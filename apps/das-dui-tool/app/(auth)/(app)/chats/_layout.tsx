import { Stack } from "expo-router"

import { H2, useTheme } from "tamagui"

export default function ChatLayout() {
	const theme = useTheme()

	return (
		<Stack
			screenOptions={{
				headerTitle({ children }) {
					return <H2>{children}</H2>
				},
				headerStyle: {
					backgroundColor: theme.background.val,
				},
			}}
		/>
	)
}
