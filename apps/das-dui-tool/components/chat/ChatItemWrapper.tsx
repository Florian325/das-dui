import { FC, PropsWithChildren } from "react"

import { Text, View } from "tamagui"

import { ChatMessagesResponse } from "@das-dui/api-client"

interface ChatItemWrapperProps {
	messages: ChatMessagesResponse.ChatMessage[]
	index: number
}

const ChatItemWrapper: FC<PropsWithChildren<ChatItemWrapperProps>> = ({
	messages,
	index,
	children,
}) => {
	const messageDate = new Date((messages ?? [])[index]?.created_at)
	const prevMessageDate = new Date((messages ?? [])[index + 1]?.created_at)
	return (
		<View py="$2">
			{messageDate.getDate() !== prevMessageDate.getDate() && (
				<View alignItems="center" pb="$4">
					<View
						p="$2"
						theme={"alt1"}
						bw="$0.5"
						bc={"$placeholderColor"}
						br={"$4"}
					>
						<Text>{messageDate.toLocaleDateString()}</Text>
					</View>
				</View>
			)}
			{children}
		</View>
	)
}

export default ChatItemWrapper
