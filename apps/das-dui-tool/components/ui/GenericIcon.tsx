import { Component, forwardRef } from "react"
import { useColorScheme } from "react-native"

import { FontAwesome } from "@expo/vector-icons"

interface GenericIconProps extends React.ComponentProps<typeof FontAwesome> {}

const GenericIcon = forwardRef<Component<GenericIconProps>, GenericIconProps>(
	({ size = 28, color, ...args }, ref) => {
		const colorScheme = useColorScheme()
		const _color = colorScheme === "dark" ? "white" : "black"

		return (
			<FontAwesome
				ref={ref}
				size={size}
				color={color ? color : _color}
				{...args}
			/>
		)
	}
)

GenericIcon.displayName = "GenericIcon"

export default GenericIcon
