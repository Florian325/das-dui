import NewsList from "@/components/news/NewsList"
import { useFocusEffect } from "expo-router"
import { useCallback } from "react"
import { StyleSheet } from "react-native"
import { View } from "tamagui"
// const queryClient = new QueryClient({
// 	defaultOptions: {
// 		queries: {
// 			gcTime: 1000 * 60 * 60 * 24, // 24 hours
// 		},
// 	},
// })
export default function NewsView() {
	useFocusEffect(
		useCallback(() => {
			console.log("focus")
		}, [])
	)
	return (
		// <PersistQueryClientProvider
		// 	client={queryClient}
		// 	persistOptions={{ persister: asyncStroragePersister }}>
		<View style={styles.container}>
			<NewsList />
		</View>
		// </PersistQueryClientProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		height: "100%",
		// alignItems: "stretch",
		// justifyContent: "center",
	},
})
