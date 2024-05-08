import { TouchableOpacity } from "react-native"
import WebView from "react-native-webview"

import { Stack, useLocalSearchParams } from "expo-router"
import * as WebBrowser from "expo-web-browser"

import { useQuery } from "@tanstack/react-query"

import { H2, Spinner, View } from "tamagui"

import GenericIcon from "@/components/ui/GenericIcon"
import useApiClient from "@/hooks/useApiClient"

export default function FileViewPage() {
	const { fileId, cloudId, name } = useLocalSearchParams<{
		fileId: string
		cloudId: string
		name: string
	}>()

	const client = useApiClient()

	const { data } = useQuery({
		queryKey: ["cloud_file", { cloudId: Number(cloudId), name, fileId }],
		queryFn: () =>
			client
				.getCloudFileById({
					fileId,
					cloudId: Number(cloudId),
				})
				.then((res) => res.data.data),

		staleTime: 1000 * 60 * 10, // 10 minutes
		gcTime: 1000 * 60 * 10, // 10 minutes
		refetchInterval: 1000 * 60 * 10, // 10 minutes
	})

	return (
		<>
			<Stack.Screen
				options={{
					title: name,
					headerTitle({ children }) {
						return (
							<View width={"85%"}>
								<H2 adjustsFontSizeToFit numberOfLines={1}>
									{children}
								</H2>
							</View>
						)
					},
					headerRight({ tintColor }) {
						if (!data) {
							return <Spinner />
						}
						return (
							<TouchableOpacity>
								<GenericIcon
									name="cloud-download"
									color={tintColor}
									onPress={() => {
										WebBrowser.openBrowserAsync(
											data?.meta.download_uri
										)
									}}
								/>
							</TouchableOpacity>
						)
					},
				}}
			/>
			{data ? <WebView source={{ uri: data.meta.uri }} /> : <Spinner />}
		</>
	)
}
