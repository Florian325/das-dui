import { useState } from "react"

import { Stack, useLocalSearchParams } from "expo-router"

import { useInfiniteQuery } from "@tanstack/react-query"

import { H5, ListItem, Spinner, View, useTheme } from "tamagui"

import { FlashList } from "@shopify/flash-list"

import GenericIcon from "@/components/ui/GenericIcon"
import InputBar from "@/components/ui/InputBar"
import useApiClient from "@/hooks/useApiClient"

export default function CloudPage() {
	const { id } = useLocalSearchParams<{ id: string }>()

	const [searchQuery, setSearchQuery] = useState<string>("")

	const client = useApiClient()
	const theme = useTheme()

	const { data, fetchNextPage, isFetchingNextPage, isLoadingError } =
		useInfiniteQuery({
			queryKey: ["chat_info", { id: Number(id), searchQuery }],
			queryFn: ({ pageParam }) =>
				client
					.getChatMemers({
						chatId: Number(id),
						page: pageParam,
						search: searchQuery,
					})
					.then((res) => res.data),
			initialPageParam: 1,
			getNextPageParam: (lastPage, _, lastPageParam) => {
				return lastPage.data.length ? lastPageParam + 1 : null
			},
			retry(failureCount) {
				return failureCount < 1
			},
		})

	if (data === undefined && isLoadingError)
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<H5 theme={"red_alt1"}>
					Only Admins are able to see group members
				</H5>
			</View>
		)

	return (
		<>
			<Stack.Screen options={{ title: "Group Information" }} />
			<FlashList
				data={data?.pages.map((page) => page.data).flat() ?? []}
				ListEmptyComponent={<Spinner />}
				ListFooterComponent={
					<>{isFetchingNextPage && <Spinner mt="$4" />}</>
				}
				renderItem={({ item }) => (
					<ListItem
						icon={
							<GenericIcon
								name="user-circle"
								color={
									item.is_admin
										? theme.blue10.val
										: theme.green10.val
								}
								size={35}
							/>
						}
						title={item.meta.displayname}
						subTitle={item.meta.subtitle}
						my="$2"
						br="$4"
						pressTheme
						hoverTheme
					/>
				)}
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
				estimatedItemSize={79}
				onEndReached={fetchNextPage}
				contentContainerStyle={{ padding: 20 }}
			/>
		</>
	)
}
