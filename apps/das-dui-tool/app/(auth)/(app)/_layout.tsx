import TabBarIcon from "@/components/ui/TabBarIcon"
import { Tabs } from "expo-router"
import { ReactNode } from "react"
import { H2, useTheme } from "tamagui"

export default function AuthAppLayout() {
	const theme = useTheme()

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
				},
				tabBarActiveTintColor: theme.colorFocus.val,
				tabBarInactiveTintColor: theme.color.val,
				tabBarIconStyle: {},
			}}
		>
			<Tabs.Screen
				name="news"
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
			<Tabs.Screen
				name="debug"
				options={{
					title: "Debug",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="bug" color={color} />
					),
					...(process.env.NODE_ENV !== "development" && {
						href: null,
					}),
				}}
			/>
			<Tabs.Screen name="index" options={{ href: null }} />
		</Tabs>
	)
}
