import GenericIcon from "@/components/ui/GenericIcon"
import InputBar from "@/components/ui/InputBar"
import useApiClient from "@/hooks/useApiClient"
import createPreviewFromText from "@/lib/createPreviewFromText"
import { FlashList } from "@shopify/flash-list"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Link, Stack } from "expo-router"
import { useState } from "react"
import { Group, H5, Spinner, Text, XStack, YStack } from "tamagui"

export default function ChatView() {
	const [searchQuery, setSearchQuery] = useState<string>("")

	const client = useApiClient()

	const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
		queryKey: ["chats", { searchQuery }],
		queryFn: ({ pageParam }) =>
			client
				.getChats({
					page: pageParam,
					search: searchQuery,
					limit: 20,
				})
				.then((res) => res.data),
		initialPageParam: 1,
		getNextPageParam: (lastPage, _, lastPageParam) => {
			return lastPage.data.length ? lastPageParam + 1 : null
		},
	})

	return (
		<>
			<Stack.Screen options={{ title: "Chats" }} />
			<FlashList
				data={data?.pages.map((page) => page.data).flat() ?? []}
				renderItem={({ item }) => (
					<Link
						push
						href={{
							pathname: "/(auth)/(app)/chats/[chatId]",
							params: {
								chatId: item.chat_id,
								displayname: item.meta.displayname,
								id: item.id,
								cloudId: item.cloud_id,
							},
						}}
						asChild
					>
						<Group bordered p="$4" hoverTheme pressTheme>
							<Group.Item>
								<YStack gap="$1">
									<XStack
										alignItems="center"
										justifyContent="space-between"
									>
										<H5>{item.meta.displayname}</H5>
										<Text>
											{new Date(
												item.activity_at
											).toLocaleDateString()}
										</Text>
									</XStack>
									<Text>{item.meta.subtitle}</Text>
									<Text>
										{createPreviewFromText(
											item.meta.description
										)}
									</Text>
								</YStack>
							</Group.Item>
						</Group>
					</Link>
				)}
				contentContainerStyle={{ padding: 20 }}
				ListEmptyComponent={<Spinner />}
				ListHeaderComponent={
					<InputBar
						inputValue={searchQuery}
						placeholder="Search"
						onInputChange={setSearchQuery}
						buttonChildren={<GenericIcon name="remove" />}
						onSubmit={() => setSearchQuery("")}
						stackProps={{ mb: "$4" }}
					/>
				}
				ListFooterComponent={
					<>{isFetchingNextPage && <Spinner mt="$4" />}</>
				}
				onEndReached={() => fetchNextPage()}
				onEndReachedThreshold={0.2}
				estimatedItemSize={200}
			/>
		</>
	)
}
