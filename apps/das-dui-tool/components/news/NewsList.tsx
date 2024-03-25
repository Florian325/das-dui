import useSduiApiClient from "@/hooks/useSduiApiClient"
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { Text } from "tamagui"
import NewsListItem from "./NewsListItem"
import { FlashList } from "@shopify/flash-list"

const NewsList = () => {
	const client = useSduiApiClient()
	const queryClient = useQueryClient()

	const {
		data,
		isLoading,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
		isRefetching,
	} = useInfiniteQuery({
		queryKey: ["news"],
		queryFn: ({ pageParam }) => client.getNews(pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage, _, lastPageParam) => {
			return lastPage.data.length ? lastPageParam + 1 : null
		},
	})

	useEffect(() => {
		console.log("next Page", hasNextPage)
	}, [isFetchingNextPage])

	useEffect(() => {
		console.log("mount")
	}, [])

	return (
		<>
			{isLoading && <Text>Loading...</Text>}
			{/* {data?.pages.map((group, i) => (
				<Fragment key={i}>
					{group.data.data.map(project => (
						<Text key={project.id}>{project.title}</Text>
					))}
				</Fragment>
			))} */}
			<FlashList
				data={data?.pages.map((page) => page.data).flat() ?? []}
				renderItem={({ item }) => (
					<NewsListItem key={item.id} item={item} />
				)}
				estimatedItemSize={100}
				// ListHeaderComponent={
				// 	<Button
				// 		onPress={() => {
				// 			console.log("resetQueries")

				// 			queryClient.resetQueries({ queryKey: ["news"] })
				// 		}}>
				// 		Delete Queries
				// 	</Button>
				// }
				// ListFooterComponent={
				// 	<Button onPress={() => fetchNextPage()}>Load More</Button>
				// }
				contentContainerStyle={{ paddingHorizontal: 20 }}
				onRefresh={() =>
					queryClient.invalidateQueries({ queryKey: ["news"] })
				}
				refreshing={isRefetching}
				onEndReached={() => fetchNextPage()}
				onEndReachedThreshold={2}
			/>
			{/* <Button onPress={() => fetchNextPage()}>Load More</Button> */}
		</>
	)
}

export default NewsList
