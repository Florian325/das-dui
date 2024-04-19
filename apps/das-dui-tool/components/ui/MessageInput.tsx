import { ComponentProps, FC, ReactNode, useState } from "react"

import { Button, Input, Spinner, XStack } from "tamagui"

interface MessageInputProps {
	placeholder?: string
	onSend: (message: string) => void
	isLoading: boolean
	buttonChildren?: ReactNode | string
	stackProps?: Omit<ComponentProps<typeof XStack>, "gap">
	gap?: ComponentProps<typeof XStack>["gap"]
}

const MessageInput: FC<MessageInputProps> = ({
	placeholder,
	onSend,
	isLoading,
	buttonChildren,
	stackProps,
	gap = "$4",
}) => {
	const [message, setMessage] = useState("")
	return (
		<XStack
			gap={gap}
			{...stackProps}
			justifyContent="center"
			alignItems="flex-end"
		>
			<Input
				flexGrow={1}
				maxWidth={"75%"}
				placeholder={placeholder}
				multiline
				value={message}
				onChangeText={setMessage}
			/>
			<Button onPress={() => onSend(message)} disabled={!message}>
				{!isLoading ? buttonChildren : <Spinner />}
			</Button>
		</XStack>
	)
}

export default MessageInput
