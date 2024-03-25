import { useSetAuthToken, useSetIsAuthenticated } from "@/context/auth"
import { Link } from "expo-router"
import { StyleSheet } from "react-native"
import { Button, Text, View } from "tamagui"

export default function ChatView() {
	// const queryClient = useQueryClient()
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
			{/* <Button
				onPress={() =>
					queryClient.invalidateQueries({ queryKey: ["news"] })
				}>
				Delete news
			</Button>
			<Button
				onPress={() => {
					{
						console.log("reset timetable")
						queryClient.removeQueries({ queryKey: ["timetable"] })
						queryClient.resetQueries({ queryKey: ["timetable"] })
					}
				}}>
				Delete Timetable
			</Button> */}
			<Button onPress={() => setAuthToken("")}>Reset Token</Button>
			<Button onPress={() => setIsAuthenticated(false)}>
				Reset Auth
			</Button>
			{/* // <View style={{ flex: 1 }}>
		// 	<PagerView style={styles.viewPager} initialPage={1}>
		// 		<View style={styles.page} key="0">
		// 			<Text>Second page</Text>
		// 		</View>
		// 		<View style={styles.page} key="1">
		// 			<Text>First page</Text>
		// 			<Text>Swipe ➡️</Text>
		// 		</View>
		// 		<View style={styles.page} key="2">
		// 			<Text>Second page</Text>
		// 		</View>
		// 		<View style={styles.page} key="3">
		// 			<Text>Third page</Text>
		// 		</View>
		// 	</PagerView> */}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	viewPager: {
		flex: 1,
	},
	page: {
		justifyContent: "center",
		alignItems: "center",
	},
})
