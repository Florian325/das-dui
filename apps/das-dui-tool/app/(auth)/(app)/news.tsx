import NewsList from "@/components/news/NewsList"
import { StyleSheet } from "react-native"
import { View } from "tamagui"

export default function NewsView() {
	return (
		<View style={styles.container}>
			<NewsList />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
})
