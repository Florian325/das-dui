import { Link, Stack, useLocalSearchParams } from "expo-router"

import {
	QueryKey,
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query"

import { H2, Spinner } from "tamagui"

import { FlashList } from "@shopify/flash-list"

import ChatItem from "@/components/chat/ChatItem"
import GenericIcon from "@/components/ui/GenericIcon"
import MessageInput from "@/components/ui/MessageInput"
import { useGetUserId } from "@/context/userId"
import useApiClient from "@/hooks/useApiClient"

export default function ChatPage() {
	const { chatId, displayname, id, cloudId, canPostMessage } =
		useLocalSearchParams<{
			chatId: string
			displayname: string
			id: string
			cloudId: string
			canPostMessage: string
		}>()

	const client = useApiClient()
	const userId = useGetUserId()

	const queryClient = useQueryClient()
	const queryKey: QueryKey = ["chat", { chatId: Number(chatId) }]

	const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
		queryKey,
		queryFn: ({ pageParam }) =>
			client
				.getChatMessagesByPage({
					chatId: Number(chatId),
					page: pageParam,
				})
				.then((res) => res.data),
		initialPageParam: 1,
		getNextPageParam: (lastPage, _, lastPageParam) => {
			return lastPage.data.length ? lastPageParam + 1 : null
		},
	})
	const messages = data?.pages.map((page) => page.data).flat()

	const chatMutation = useMutation({
		mutationFn: (message: { content: string }) => {
			return client.postChatMessage({
				chatId: Number(chatId),
				message: message.content,
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey,
			})
		},
	})

	return (
		<>
			<Stack.Screen
				options={{
					title: displayname,
					headerTitle({ children }) {
						return (
							<Link
								push
								href={{
									pathname: "/(auth)/(app)/chats/info/[id]",
									params: {
										id: id,
									},
								}}
							>
								<H2>{children}</H2>
							</Link>
						)
					},
					headerRight({ tintColor }) {
						return (
							<Link
								push
								href={{
									pathname:
										"/(auth)/(app)/chats/cloud/file/[fileId]",
									params: {
										fileId: "null",
										cloudId,
										path: "Cloud",
									},
								}}
								asChild
							>
								<GenericIcon name="cloud" color={tintColor} />
							</Link>
						)
					},
				}}
			/>
			<FlashList
				contentContainerStyle={{ padding: 20 }}
				data={messages}
				extraData={{ messages: messages, userId: userId }}
				onEndReached={fetchNextPage}
				ListEmptyComponent={Spinner}
				ListFooterComponent={
					<>{isFetchingNextPage && <Spinner mb="$4" />}</>
				}
				estimatedItemSize={50}
				ListHeaderComponent={
					<MessageInput
						placeholder="Write Message"
						buttonChildren="Send"
						disabled={!Number(canPostMessage)}
						stackProps={{ mt: "$4" }}
						onSend={(message) =>
							chatMutation.mutate({ content: message })
						}
						isLoading={chatMutation.isPending}
					/>
				}
				renderItem={ChatItem}
				inverted
			/>
		</>
	)
}
