/* eslint-disable react/display-name */
import { Fragment, LegacyRef, ReactNode, forwardRef } from "react"
import { StyleSheet } from "react-native"

import * as Linking from "expo-linking"
import { Link, Stack, useLocalSearchParams } from "expo-router"

import {
	QueryKey,
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query"

import {
	H2,
	Image,
	ListItem,
	ListItemSubtitle,
	SizableText,
	Spinner,
	TamaguiElement,
	Text,
	View,
} from "tamagui"

import { FlashList } from "@shopify/flash-list"

import { NewsResponse } from "@das-dui/api-client"

import FileLink from "@/components/cloud/FileLink"
import FileListItemLink from "@/components/cloud/FileListItemLink"
import NewsListItem from "@/components/news/NewsListItem"
import GenericIcon from "@/components/ui/GenericIcon"
import MessageInput from "@/components/ui/MessageInput"
import RenderHTMLGeneric from "@/components/ui/RenderHTMLGeneric"
import { useGetUserId } from "@/context/userId"
import useApiClient from "@/hooks/useApiClient"

export default function ChatPage() {
	const { chatId, displayname, id, cloudId } = useLocalSearchParams<{
		chatId: string
		displayname: string
		id: string
		cloudId: string
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
					headerTitle(props: { children: ReactNode }) {
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
								<H2>{props.children}</H2>
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
				data={messages ?? []}
				onEndReached={() => fetchNextPage()}
				ListEmptyComponent={<Spinner />}
				ListFooterComponent={
					<>{isFetchingNextPage && <Spinner mb="$4" />}</>
				}
				estimatedItemSize={50}
				ListHeaderComponent={
					<MessageInput
						placeholder="Write Message"
						buttonChildren="Send"
						stackProps={{ mt: "$4" }}
						onSend={(message) =>
							chatMutation.mutate({ content: message })
						}
						isLoading={chatMutation.isPending}
					/>
				}
				disableAutoLayout
				CellRendererComponent={forwardRef(
					(props: { index: number; children: ReactNode }, ref) => {
						const messageDate = new Date(
							(messages ?? [])[props.index]?.created_at
						)
						const prevMessageDate = new Date(
							(messages ?? [])[props.index + 1]?.created_at
						)
						return (
							<View
								ref={ref as LegacyRef<TamaguiElement>}
								{...props}
								py="$2"
							>
								{messageDate.getDate() !==
									prevMessageDate.getDate() && (
									<View alignItems="center" pb="$4">
										<View
											p="$2"
											theme={"alt1"}
											bw="$0.5"
											bc={"$placeholderColor"}
											br={"$4"}
										>
											<Text>
												{messageDate.toLocaleDateString()}
											</Text>
										</View>
									</View>
								)}
								{props.children}
							</View>
						)
					}
				)}
				renderItem={({ item }) => (
					<Fragment>
						{item.type === "MESSAGE" && (
							<View
								alignItems={
									item.user.id === userId
										? "flex-end"
										: "flex-start"
								}
								flex={1}
							>
								<View
									py="$2"
									px="$4"
									bw="$0.5"
									bc={"$placeholderColor"}
									br={"$4"}
									maxWidth={"80%"}
								>
									<ListItemSubtitle>
										{item.user.meta.displayname}
									</ListItemSubtitle>
									{item.preview && (
										<ListItem
											onPress={() =>
												Linking.openURL(
													item.preview?.link ?? ""
												)
											}
											pressTheme
											hoverTheme
											br="$4"
											title={item.preview.title}
											subTitle={item.preview.description}
										/>
									)}
									{item.file ? (
										<>
											{item.file.type?.startsWith(
												"image"
											) ? (
												<FileLink
													cloud_id={
														item.file.cloud_id
													}
													file_type={
														item.file.file_type
													}
													name={item.file.name}
													path={item.file.path}
													uuid={item.file.uuid}
												>
													<Image
														source={{
															uri:
																item.file.meta
																	.thumbnail_uri ??
																item.file.meta
																	.uri,
														}}
														style={styles.image}
													/>
												</FileLink>
											) : (
												<FileListItemLink
													cloud_id={
														item.file.cloud_id
													}
													extension={
														item.file.extension
													}
													file_type={
														item.file.file_type
													}
													meta={item.file.meta}
													name={item.file.name}
													path={item.file.path}
													uuid={item.file.uuid}
												/>
											)}
										</>
									) : (
										<RenderHTMLGeneric
											content={
												item.content_rendered ||
												"<i>Deleted</i>"
											}
										/>
									)}

									<View alignSelf="flex-end">
										<SizableText fontSize={"$3"}>
											{new Date(
												item.created_at
											).toLocaleTimeString()}
										</SizableText>
									</View>
								</View>
							</View>
						)}
						{item.type === "HINT" && (
							<View alignItems={"center"} flex={1}>
								{item.target_type === "news" ? (
									<View
										width={"100%"}
										py="$2"
										px="$4"
										bw="$0.5"
										bc={"$placeholderColor"}
										br={"$4"}
									>
										<ListItemSubtitle>
											{item.user.meta.displayname}
										</ListItemSubtitle>
										<NewsListItem
											item={
												item.target as NewsResponse.News
											}
										/>
										<View alignSelf="flex-end">
											<SizableText fontSize={"$3"}>
												{new Date(
													item.created_at
												).toLocaleTimeString()}
											</SizableText>
										</View>
									</View>
								) : (
									<View
										py="$2"
										px="$4"
										theme={"alt1"}
										backgroundColor={"$blue4"}
										br={"$4"}
									>
										<RenderHTMLGeneric
											content={item.content_rendered}
										/>
									</View>
								)}
							</View>
						)}
					</Fragment>
				)}
				inverted
			/>
		</>
	)
}

const styles = StyleSheet.create({
	image: {
		width: 200,
		height: 150,
		resizeMode: "contain",
	},
})
