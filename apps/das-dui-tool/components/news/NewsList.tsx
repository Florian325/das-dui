import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"

import { Text } from "tamagui"

import { FlashList } from "@shopify/flash-list"

import NewsListItem from "@/components/news/NewsListItem"
import useApiClient from "@/hooks/useApiClient"

const NewsList = () => {
	const client = useApiClient()
	const queryClient = useQueryClient()

	const { data, isLoading, fetchNextPage, isRefetching } = useInfiniteQuery({
		queryKey: ["news"],
		queryFn: ({ pageParam }) =>
			client.getNewsByPage({ page: pageParam }).then((res) => res.data),
		initialPageParam: 1,
		getNextPageParam: (lastPage, _, lastPageParam) => {
			return lastPage.data.length ? lastPageParam + 1 : null
		},
	})

	if (isLoading) {
		return <Text>Loading...</Text>
	}
	return (
		<FlashList
			data={data?.pages.map((page) => page.data).flat() ?? []}
			renderItem={({ item }) => (
				<NewsListItem key={item.id} item={item} />
			)}
			estimatedItemSize={100}
			contentContainerStyle={{ paddingHorizontal: 20 }}
			onRefresh={() =>
				queryClient.invalidateQueries({ queryKey: ["news"] })
			}
			refreshing={isRefetching}
			onEndReached={() => fetchNextPage()}
			onEndReachedThreshold={2}
		/>
	)
}

export default NewsList
