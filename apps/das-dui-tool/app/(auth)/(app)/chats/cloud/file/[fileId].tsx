import { useState } from "react"
import { TouchableOpacity } from "react-native"

import { Stack, useLocalSearchParams } from "expo-router"

import { useInfiniteQuery } from "@tanstack/react-query"

import { H2, H6, Spinner, View, useTheme } from "tamagui"

import { FlashList } from "@shopify/flash-list"

import FileListItemLink from "@/components/cloud/FileListItemLink"
import GenericIcon from "@/components/ui/GenericIcon"
import InputBar from "@/components/ui/InputBar"
import useApiClient from "@/hooks/useApiClient"

export default function CloudPage() {
	const { fileId, cloudId, path } = useLocalSearchParams<{
		fileId: string
		cloudId: string
		path: string
	}>()
	const [searchQuery, setSearchQuery] = useState<string>("")

	const client = useApiClient()
	const theme = useTheme()

	const { data, isLoading, fetchNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: [
				"cloud_files",
				{ cloudId: Number(cloudId), searchQuery, fileId, path },
			],
			queryFn: ({ pageParam }) =>
				client
					.getCloudFiles({
						cloudId: Number(cloudId),
						page: pageParam,
						path,
						file: fileId,
						search: searchQuery,
					})
					.then((res) => res.data),
			initialPageParam: 1,
			getNextPageParam: (lastPage, _, lastPageParam) => {
				return lastPage.data.length ? lastPageParam + 1 : null
			},
			retry(failureCount) {
				return failureCount < 2
			},
		})

	return (
		<>
			<Stack.Screen
				options={{
					title: path,
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
						return (
							<TouchableOpacity>
								<GenericIcon
									name="plus-circle"
									color={tintColor}
								/>
							</TouchableOpacity>
						)
					},
				}}
			/>
			<FlashList
				data={data?.pages.map((page) => page.data).flat() ?? []}
				ListEmptyComponent={
					<>
						{!isLoading && (
							<View flex={1} alignItems="center">
								<H6>Empty Folder</H6>
							</View>
						)}
					</>
				}
				ListFooterComponent={
					<>
						{(isLoading || isFetchingNextPage) && (
							<Spinner mt="$4" />
						)}
					</>
				}
				ListHeaderComponent={
					<InputBar
						stackProps={{ mb: "$4" }}
						inputValue={searchQuery}
						onInputChange={setSearchQuery}
						placeholder="Search Files"
						buttonChildren={
							<GenericIcon
								name="remove"
								color={theme.color9.val}
							/>
						}
						onSubmit={() => setSearchQuery("")}
					/>
				}
				renderItem={({ item }) => (
					<FileListItemLink
						cloud_id={item.cloud_id}
						extension={item.extension}
						file_type={item.file_type}
						meta={item.meta}
						name={item.name}
						uuid={item.uuid}
						path={item.path}
					/>
				)}
				onEndReached={fetchNextPage}
				estimatedItemSize={80}
				contentContainerStyle={{ padding: 20 }}
			/>
		</>
	)
}
