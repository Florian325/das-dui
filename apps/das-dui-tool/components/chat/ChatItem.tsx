import { ListRenderItem } from "@shopify/flash-list"

import { ChatMessagesResponse } from "@das-dui/api-client"

import ChatHint from "@/components/chat/ChatHint"
import ChatItemWrapper from "@/components/chat/ChatItemWrapper"
import ChatMessage from "@/components/chat/ChatMessage"

const ChatItem: ListRenderItem<ChatMessagesResponse.ChatMessage> = (info) => {
	const { item, index } = info
	const extraData = info.extraData as {
		messages: ChatMessagesResponse.ChatMessage[]
		userId: number
	}

	return (
		<ChatItemWrapper messages={extraData.messages} index={index}>
			{item.type === "MESSAGE" && (
				<ChatMessage message={item} userId={extraData.userId} />
			)}
			{item.type === "HINT" && <ChatHint message={item} />}
		</ChatItemWrapper>
	)
}

export default ChatItem
