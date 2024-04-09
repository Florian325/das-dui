import { FC, ReactNode } from "react"

import { QueryFilters, useQueryClient } from "@tanstack/react-query"

import {
	Button,
	H4,
	H5,
	ScrollView,
	Separator,
	Text,
	XStack,
	YGroup,
	YStack,
} from "tamagui"

import { useSetAuthToken, useSetIsAuthenticated } from "@/context/auth"

interface DebugMenuItemProps {
	filter: QueryFilters
}
const DebugMenuItem: FC<DebugMenuItemProps> = ({ filter }) => {
	const queryClient = useQueryClient()
	const fetching = queryClient.isFetching(filter)
	return (
		<XStack
			gap="$2"
			justifyContent="space-evenly"
			separator={<Separator vertical />}
		>
			<YStack alignItems="center">
				<H5>Fetching</H5>
				<Text theme={"alt1"}>{fetching}</Text>
			</YStack>
			<Button
				onPress={async () =>
					await queryClient.invalidateQueries(filter)
				}
			>
				Invalidate
			</Button>
			<Button
				onPress={async () => await queryClient.resetQueries(filter)}
			>
				Reset
			</Button>
			<Button onPress={() => queryClient.removeQueries(filter)}>
				Remove
			</Button>
			<Button
				onPress={async () => await queryClient.refetchQueries(filter)}
			>
				Refetch
			</Button>
		</XStack>
	)
}

interface DebugSectionProps {
	title: string
	children: ReactNode
}
const DebugSection: FC<DebugSectionProps> = ({ title, children }) => {
	return (
		<YGroup bordered separator={<Separator />}>
			<YGroup.Item>
				<YStack p="$4" gap="$2" separator={<Separator />}>
					<H4>{title}</H4>
					{children}
				</YStack>
			</YGroup.Item>
		</YGroup>
	)
}

function DebugPage() {
	const setToken = useSetAuthToken()
	const setIsAuth = useSetIsAuthenticated()
	const queryClient = useQueryClient()
	return (
		<ScrollView>
			<YStack flex={1} gap="$4" p="$4">
				<DebugSection title="News">
					<DebugMenuItem
						filter={{ queryKey: ["news"], type: "all" }}
					/>
				</DebugSection>

				<DebugSection title="Survey">
					<DebugMenuItem
						filter={{ queryKey: ["survey"], type: "all" }}
					/>
				</DebugSection>

				<DebugSection title="Timetable Weeks">
					<DebugMenuItem
						filter={{
							queryKey: ["timetableWeekItem"],
							type: "all",
						}}
					/>
				</DebugSection>

				<DebugSection title="Timetable Times">
					<DebugMenuItem
						filter={{ queryKey: ["timetableTimes"], type: "all" }}
					/>
				</DebugSection>

				<DebugSection title="Classbook Entry">
					<DebugMenuItem
						filter={{ queryKey: ["classbookEntry"], type: "all" }}
					/>
				</DebugSection>

				<DebugSection title="Self User">
					<DebugMenuItem
						filter={{ queryKey: ["self"], type: "all" }}
					/>
				</DebugSection>
				<DebugSection title="Chats">
					<DebugMenuItem
						filter={{ queryKey: ["chats"], type: "all" }}
					/>
				</DebugSection>
				<DebugSection title="Chat">
					<DebugMenuItem
						filter={{ queryKey: ["chat"], type: "all" }}
					/>
				</DebugSection>
				<DebugSection title="Cloud Files">
					<DebugMenuItem
						filter={{ queryKey: ["cloud_files"], type: "all" }}
					/>
				</DebugSection>
				<DebugSection title="Cloud File">
					<DebugMenuItem
						filter={{ queryKey: ["cloud_file"], type: "all" }}
					/>
				</DebugSection>
				<DebugSection title="Logout">
					<Button onPress={() => setIsAuth(false)}>
						Set auth to false
					</Button>
					<Button onPress={() => setToken("")}>Clear Token</Button>
				</DebugSection>
				<DebugSection title="Clear cache">
					<Button onPress={() => queryClient.clear()}>Clear</Button>
				</DebugSection>
			</YStack>
		</ScrollView>
	)
}

export default DebugPage
