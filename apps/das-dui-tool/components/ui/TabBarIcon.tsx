import { FC } from "react"

import { FontAwesome } from "@expo/vector-icons"

interface TabBarIconProps {
	name: React.ComponentProps<typeof FontAwesome>["name"]
	color: string
}

const TabBarIcon: FC<TabBarIconProps> = ({ name, color }) => {
	return (
		<FontAwesome
			size={28}
			style={{ marginBottom: -3 }}
			name={name}
			color={color}
		/>
	)
}

export default TabBarIcon
