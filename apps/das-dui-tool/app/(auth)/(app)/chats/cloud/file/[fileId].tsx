import { FlashList } from "@shopify/flash-list"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Link, Stack, useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { TouchableOpacity } from "react-native"
import { H6, ListItem, Spinner, View, useTheme } from "tamagui"
import * as WebBrowser from "expo-web-browser"

import GenericIcon from "@/components/ui/GenericIcon"
import InputBar from "@/components/ui/InputBar"
import useApiClient from "@/hooks/useApiClient"
import { iconNameBasedOnFileExtension } from "@/utils/iconNameBasedOnFileExtension"

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
				renderItem={({ item }) => {
					const params = new URLSearchParams({
						name: item.name,
					})
					const nameParam = params
						.toString()
						.split("&")[0]
						.split("=")[1]
						.replaceAll("+", " ")

					return (
						<Link
							push
							href={
								item.file_type === "DIR"
									? {
											pathname:
												"/(auth)/(app)/chats/cloud/file/[fileId]",
											params: {
												fileId: item.uuid,
												cloudId: cloudId,
												path: item.path,
											},
										}
									: {
											pathname:
												"/(auth)/(app)/chats/cloud/open_file/[fileId]",
											params: {
												fileId: item.uuid,
												cloudId: item.cloud_id,
												name: nameParam,
											},
										}
							}
							asChild
						>
							<ListItem
								title={item.name}
								subTitle={item.meta.subtitle}
								icon={
									<GenericIcon
										name={
											item.file_type === "DIR"
												? item.meta.files_count > 0
													? "folder"
													: "folder-open"
												: iconNameBasedOnFileExtension(
														item.extension
													)
										}
										size={30}
										color={theme.color10.val}
									/>
								}
								iconAfter={
									<TouchableOpacity
										onPress={() =>
											WebBrowser.openBrowserAsync(
												item.meta.download_uri
											)
										}
									>
										<GenericIcon
											name="download"
											color={theme.color9.val}
										/>
									</TouchableOpacity>
								}
								bordered
								pressTheme
								hoverTheme
								br={"$4"}
								my="$2"
							/>
						</Link>
					)
				}}
				onEndReached={fetchNextPage}
				estimatedItemSize={80}
				contentContainerStyle={{ padding: 20 }}
			/>
		</>
	)
}
