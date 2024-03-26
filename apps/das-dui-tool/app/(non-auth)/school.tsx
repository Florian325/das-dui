import useApiClient from "@/hooks/useApiClient"
import { useQuery } from "@tanstack/react-query"
import { Link } from "expo-router"
import { useState } from "react"
import { FlatList, StyleSheet } from "react-native"
import {
	Form,
	H4,
	H5,
	Input,
	Label,
	ListItem,
	Separator,
	Spinner,
	View,
	YGroup,
	useTheme,
} from "tamagui"

export default function LogInScreen() {
	const [searchQuery, setSearchQuery] = useState("")
	const theme = useTheme()
	const client = useApiClient()

	const { data, isLoading } = useQuery({
		queryKey: ["school", searchQuery],
		queryFn: async () => {
			const response = await client.getLeadsByName({
				searchQuery: searchQuery,
			})
			console.log(response.data.data)
			return response.data
		},
	})

	return (
		<View style={styles.container}>
			<H4>Schools:</H4>
			{isLoading && (
				<View style={styles.loadingRoot}>
					<Spinner size="large" />
				</View>
			)}
			<FlatList
				data={data?.data}
				CellRendererComponent={({ children }) => (
					<YGroup
						alignSelf="center"
						bordered
						size="$5"
						separator={<Separator />}
					>
						{children}
					</YGroup>
				)}
				renderItem={({ item, index }) => (
					<YGroup.Item key={index}>
						<Link
							href={{
								pathname: "/log-in",
								params: {
									slink: item.slink,
									name: item.name_alias || item.name,
								},
							}}
							asChild
						>
							<ListItem
								hoverTheme
								pressTheme
								title={item.name}
								subTitle={item.shortcut}
							>
								{item.name_alias}
							</ListItem>
						</Link>
					</YGroup.Item>
				)}
			/>
			{data?.data.length == 0 && (
				<H5 color={theme.yellow11.val}>No results</H5>
			)}
			<Form onSubmit={() => true}>
				<Label>School Name</Label>
				<Input
					value={searchQuery}
					onChangeText={setSearchQuery}
					placeholder="Search for a school"
				/>
			</Form>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	loadingRoot: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	separator: {
		marginVertical: 30,
		height: 5,
		width: "80%",
	},
})
