import { useGetIsAuthenticated } from "@/context/auth"
import { Redirect, Stack } from "expo-router"
import { H3, useTheme } from "tamagui"
import { FC, ReactNode } from "react"
import {
	QueryClient,
	onlineManager,
	useQueryClient,
} from "@tanstack/react-query"
import NetInfo from "@react-native-community/netinfo"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { useSelectedUserId, useUserId } from "@/context/userId"
import { View } from "@/components/Themed"
import useApiClient from "@/hooks/useApiClient"

onlineManager.setEventListener((setOnline) => {
	return NetInfo.addEventListener((state) => {
		setOnline(!!state.isConnected)
	})
})

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 1000 * 60 * 60 * 24, // 24 hours
			staleTime: 1000 * 60 * 60 * 2, // 2 hours
		},
	},
})

const asyncStoragePersister = createAsyncStoragePersister({
	storage: AsyncStorage,
})

interface PersisterProps {
	children: ReactNode
}
const Persister: FC<PersisterProps> = ({ children }) => {
	return (
		<PersistQueryClientProvider
			client={queryClient}
			persistOptions={{ persister: asyncStoragePersister }}
		>
			{children}
		</PersistQueryClientProvider>
	)
}

function AuthLayoutConsumer() {
	const isAuthenticated = useGetIsAuthenticated()
	const theme = useTheme()

	const [userId, setUserId] = useUserId()
	const [selectedUserId, setSelectedUserId] = useSelectedUserId()
	const client = useApiClient()

	const queryClient = useQueryClient()

	// You can keep the splash screen open, or render a loading screen like we do here.

	// Only require authentication within the (app) group's layout as users
	// need to be able to access the (auth) group and sign in again.
	if (!isAuthenticated) {
		// On web, static rendering will stop here as the user is not authenticated
		// in the headless Node process that the pages are rendered in.
		return <Redirect href="/(non-auth)/school" />
	}

	const fetchSelf = async () => {
		const response = await queryClient.fetchQuery({
			queryKey: ["self", { userId: userId }],
			queryFn: async () => await client.getUser().then((r) => r.data),
		})
		setUserId(response.data.id)
		if (selectedUserId === 0) {
			setSelectedUserId(response.data.id)
		}
	}
	fetchSelf()
	return (
		<View style={{ flex: 1 }}>
			{selectedUserId !== 0 && (
				<Stack
					screenOptions={{
						headerTitle(props: { children: ReactNode }) {
							return <H3>{props.children}</H3>
						},
						headerStyle: {
							backgroundColor: theme.background.val,
						},
					}}
				>
					<Stack.Screen
						name="(app)"
						options={{
							// Hide the header for all other routes.
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="modal"
						options={{
							// Set the presentation mode to modal for our modal route.
							presentation: "modal",
							title: "Modal",
						}}
					/>
					<Stack.Screen
						name="lesson-info"
						options={{
							// Set the presentation mode to modal for our modal route.
							presentation: "modal",
							title: "Lesson Info",
						}}
					/>
				</Stack>
			)}
		</View>
	)
}

export default function AuthLayout() {
	return (
		<Persister>
			<AuthLayoutConsumer />
		</Persister>
	)
}
