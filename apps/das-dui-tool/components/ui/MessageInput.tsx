import { ComponentProps, FC, ReactNode, useState } from "react"

import { Button, Input, Spinner, XStack } from "tamagui"

interface MessageInputProps {
	placeholder?: string
	onSend: (message: string) => void
	isLoading: boolean
	disabled: boolean
	buttonChildren?: ReactNode | string
	stackProps?: Omit<ComponentProps<typeof XStack>, "gap">
	gap?: ComponentProps<typeof XStack>["gap"]
}

const MessageInput: FC<MessageInputProps> = ({
	placeholder,
	onSend,
	isLoading,
	disabled,
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
				disabled={disabled}
				placeholder={placeholder}
				multiline
				value={message}
				onChangeText={setMessage}
			/>
			<Button
				onPress={() => onSend(message)}
				disabled={!message || disabled}
			>
				{!isLoading ? buttonChildren : <Spinner />}
			</Button>
		</XStack>
	)
}

export default MessageInput
