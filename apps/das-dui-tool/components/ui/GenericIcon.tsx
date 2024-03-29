import { FontAwesome } from "@expo/vector-icons"
import { FC } from "react"
import { useColorScheme } from "react-native"

interface GenericIconProps
	extends Omit<React.ComponentProps<typeof FontAwesome>, "color"> {}

const GenericIcon: FC<GenericIconProps> = ({ size = 28, ...args }) => {
	const colorScheme = useColorScheme()
	const color = colorScheme === "dark" ? "white" : "black"

	return <FontAwesome size={size} color={color} {...args} />
}

export default GenericIcon
