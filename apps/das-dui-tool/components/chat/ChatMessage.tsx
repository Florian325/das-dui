import { FC } from "react"

import * as Linking from "expo-linking"

import { ListItem, ListItemSubtitle, SizableText, View } from "tamagui"

import { ChatMessagesResponse } from "@das-dui/api-client"

import ChatMessageFile from "@/components/chat/ChatMessageFile"
import RenderHTMLGeneric from "@/components/ui/RenderHTMLGeneric"

interface ChatMessageProps {
	message: ChatMessagesResponse.ChatMessage
	userId: number
}

const ChatMessage: FC<ChatMessageProps> = ({ message, userId }) => {
	return (
		<View
			alignItems={message.user.id === userId ? "flex-end" : "flex-start"}
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
					{message.user.meta.displayname}
				</ListItemSubtitle>
				{message.preview && (
					<ListItem
						onPress={() =>
							Linking.openURL(message.preview?.link ?? "")
						}
						pressTheme
						hoverTheme
						br="$4"
						title={message.preview.title}
						subTitle={message.preview.description}
					/>
				)}
				{message.file ? (
					<ChatMessageFile file={message.file} />
				) : (
					<RenderHTMLGeneric
						content={message.content_rendered || "<i>Deleted</i>"}
					/>
				)}

				<View alignSelf="flex-end">
					<SizableText fontSize={"$3"}>
						{new Date(message.created_at).toLocaleTimeString()}
					</SizableText>
				</View>
			</View>
		</View>
	)
}

export default ChatMessage
