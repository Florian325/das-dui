import { useGetIsAuthenticated } from "@/context/auth"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Redirect, Stack } from "expo-router"
import { ReactNode } from "react"
import { H2, useTheme } from "tamagui"

const queryClient = new QueryClient()

export default function NonAuthLayout() {
	const isAuthenticated = useGetIsAuthenticated()
	const theme = useTheme()

	if (isAuthenticated) {
		// On web, static rendering will stop here as the user is not authenticated
		// in the headless Node process that the pages are rendered in.
		return <Redirect href="/(auth)/(app)" />
	}
	return (
		<QueryClientProvider client={queryClient}>
			<Stack
				screenOptions={{
					headerTitle(props: { children: ReactNode }) {
						return <H2>{props.children}</H2>
					},
					headerStyle: {
						backgroundColor: theme.background.val,
					},
				}}
			>
				<Stack.Screen name="log-in" options={{ title: "Login" }} />
				<Stack.Screen
					name="school"
					options={{ title: "School Selection" }}
				/>
			</Stack>
		</QueryClientProvider>
	)
}
