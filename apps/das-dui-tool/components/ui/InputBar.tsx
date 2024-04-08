import { ComponentProps, FC, ReactNode } from "react"
import { Button, Input, XStack } from "tamagui"

interface InputBarProps {
	inputValue?: string
	placeholder?: string
	onInputChange?: (value: string) => void
	onSubmit?: () => void
	buttonChildren?: ReactNode | string
	stackProps?: Omit<ComponentProps<typeof XStack>, "gap">
	gap?: ComponentProps<typeof XStack>["gap"]
}

const InputBar: FC<InputBarProps> = ({
	inputValue,
	placeholder,
	onInputChange,
	onSubmit,
	buttonChildren,
	stackProps,
	gap = "$4",
}) => {
	return (
		<XStack gap={gap} {...stackProps}>
			<Input
				flexGrow={1}
				placeholder={placeholder}
				value={inputValue}
				onChangeText={onInputChange}
			/>
			<Button onPress={onSubmit}>{buttonChildren}</Button>
		</XStack>
	)
}

export default InputBar
