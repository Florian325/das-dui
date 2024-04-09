import { StyleSheet } from "react-native"

import { Text, YStack } from "tamagui"

const SettingsPage = () => {
	return (
		<YStack style={styles.container} space>
			<Text>Settings Page</Text>
		</YStack>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 10,
	},
})

export default SettingsPage
