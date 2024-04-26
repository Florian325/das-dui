import { FC } from "react"

import { ListItemSubtitle, SizableText, View } from "tamagui"

import { ChatMessagesResponse, NewsResponse } from "@das-dui/api-client"

import NewsListItem from "@/components/news/NewsListItem"
import RenderHTMLGeneric from "@/components/ui/RenderHTMLGeneric"

interface ChatHintProps {
	message: ChatMessagesResponse.ChatMessage
}

const ChatHint: FC<ChatHintProps> = ({ message }) => {
	if (message.target_type === "news")
		return (
			<View alignItems={"center"} flex={1}>
				<View
					width={"100%"}
					py="$2"
					px="$4"
					bw="$0.5"
					bc={"$placeholderColor"}
					br={"$4"}
				>
					<ListItemSubtitle>
						{message.user.meta.displayname}
					</ListItemSubtitle>
					<NewsListItem item={message.target as NewsResponse.News} />
					<View alignSelf="flex-end">
						<SizableText fontSize={"$3"}>
							{new Date(message.created_at).toLocaleTimeString()}
						</SizableText>
					</View>
				</View>
			</View>
		)

	return (
		<View alignItems={"center"} flex={1}>
			<View
				py="$2"
				px="$4"
				theme={"alt1"}
				backgroundColor={"$blue4"}
				br={"$4"}
			>
				<RenderHTMLGeneric content={message.content_rendered} />
			</View>
		</View>
	)
}

export default ChatHint
