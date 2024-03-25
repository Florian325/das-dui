import { FontAwesome } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { ReactNode } from "react"
import { H2, useTheme } from "tamagui"

function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"]
	color: string
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function AppLayout() {
	const theme = useTheme()
	// const queryClient = useQueryClient()

	// This layout can be deferred because it's not the root layout.
	return (
		<Tabs
			initialRouteName="timetable"
			screenOptions={{
				headerTitle(props: { children: ReactNode }) {
					return <H2>{props.children}</H2>
				},
				headerStyle: {
					backgroundColor: theme.background.val,
				},
				tabBarStyle: {
					backgroundColor: theme.background.val,
					borderTopColor: theme.borderColor.val,
					borderTopWidth: 1,
					shadowColor: theme.shadowColor.val,
					shadowOffset: { width: 0, height: 1 },
					shadowOpacity: 0.8,
					shadowRadius: 1,
					// elevation: 3,
					// borderTopLeftRadius: 10,
					// borderTopRightRadius: 10,
					// zIndex: 20,
					// position: "absolute",
				},
				tabBarActiveTintColor: theme.colorFocus.val,
				tabBarInactiveTintColor: theme.color.val,
				tabBarIconStyle: {},
				// tabBarActiveBackgroundColor: theme.background.val,
			}}
		>
			{/* <Tabs.Screen
				name="index"
				redirect
				options={{
					title: "Tab One",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="amazon" color={color} />
					),
				}}
			/> */}
			<Tabs.Screen
				name="news"
				// listeners={{
				// 	tabPress: () =>
				// 		queryClient.invalidateQueries({ queryKey: ["news"] }),
				// }}
				options={{
					title: "News",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="newspaper-o" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="timetable"
				options={{
					title: "Timetable",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="calendar" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="chats"
				options={{
					title: "Chats",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="comment" color={color} />
					),
				}}
			/>
			{/* <Tabs.Screen name="infinite" options={{ title: "infinite" }} /> */}
			<Tabs.Screen name="index" options={{ href: null }} />
		</Tabs>
	)
}
