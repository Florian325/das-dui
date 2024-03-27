import ResponseInformation from "@/components/ui/ResponseInformation"
import { useSetAuthToken, useSetIsAuthenticated } from "@/context/auth"
import useAxiosInstance from "@/hooks/useAxiosInstance"
import { BaseResponse, LoginResponse } from "@das-dui/api-client"
import { useMutation } from "@tanstack/react-query"
import { router, useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { StyleSheet } from "react-native"
import { Button, Form, H3, Input, Label, Spinner, View, YStack } from "tamagui"

export default function LogInScreen() {
	const { slink, name } = useLocalSearchParams<{
		slink: string
		name: string
	}>()
	const [username, setUsername] = useState<string>("")
	const [password, setPassword] = useState<string>("")

	const client = useAxiosInstance()
	const setAuthToken = useSetAuthToken()
	const setIsAuthenticated = useSetIsAuthenticated()

	const loginMutation = useMutation({
		mutationFn: async () => {
			const resp = await client.post<
				BaseResponse<LoginResponse.LoginToken>
			>("auth/login", {
				identifier: username,
				password: password,
				slink: slink,
				showError: true,
				token: "",
			})
			console.log(resp.data.data.access_token)
			return resp.data.data.access_token
		},
		onSuccess(data) {
			setAuthToken(data)
			setIsAuthenticated(true)
			router.replace("/")
		},
	})

	return (
		<Form onSubmit={loginMutation.mutate} style={styles.container}>
			<YStack gap={"$5"}>
				<H3>{name}</H3>
				<View>
					<Label htmlFor="name">Name</Label>
					<Input
						id="name"
						value={username}
						onChangeText={setUsername}
						placeholder="Username"
					/>
				</View>
				<View>
					<Label htmlFor="password">Password</Label>
					<Input
						secureTextEntry
						id="password"
						value={password}
						onChangeText={setPassword}
						placeholder="Password"
					/>
				</View>
				<ResponseInformation />
				<Form.Trigger asChild>
					<Button disabled={loginMutation.isPending}>
						{loginMutation.isPending ? <Spinner /> : "Log in"}
					</Button>
				</Form.Trigger>
			</YStack>
		</Form>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
})
