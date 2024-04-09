import { StyleSheet } from "react-native"

import { Text, View } from "tamagui"

export default function IndexView() {
	return (
		<View style={styles.container}>
			<Text>News View</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
})
