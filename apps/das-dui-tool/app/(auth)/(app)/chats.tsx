import { useSetAuthToken, useSetIsAuthenticated } from "@/context/auth"
import { Link } from "expo-router"
import { StyleSheet } from "react-native"
import { Button, Text, View } from "tamagui"

export default function ChatView() {
	const setAuthToken = useSetAuthToken()
	const setIsAuthenticated = useSetIsAuthenticated()

	return (
		<View style={styles.container}>
			<Text>Chat View</Text>
			<Link href={"/modal"} asChild>
				<Button>Open Modal</Button>
			</Link>
			<Link href={"/lesson-info"} asChild>
				<Button>Open Lesson Modal</Button>
			</Link>
			<Button onPress={() => setAuthToken("")}>Reset Token</Button>
			<Button onPress={() => setIsAuthenticated(false)}>
				Reset Auth
			</Button>
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
