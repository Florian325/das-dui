import { FC, memo } from "react"
import { StyleSheet } from "react-native"

import { useQuery } from "@tanstack/react-query"

import { Spinner, Text, View } from "tamagui"

import TimetableGrid from "@/components/timetable/TimetableGrid"
import TimetableTopBarContainer from "@/components/timetable/TimetableTopBarContainer"
import WeekDayBar from "@/components/timetable/WeekDayBar"
import { useGetSelectedUserId } from "@/context/userId"
import useApiClient from "@/hooks/useApiClient"
import useTimetableWeekRange from "@/hooks/useTimetableWeekRange"

interface TimetablePageProps {
	index: number
}

const TimetablePageView: FC<TimetablePageProps> = ({ index }) => {
	return (
		<View style={styles.container} borderColor={"$placeholderColor"}>
			<TimetableTopBarContainer>
				<WeekDayBar offset={index} />
			</TimetableTopBarContainer>
			<TimetablePageContent index={index} />
		</View>
	)
}

const TimetablePageContent: FC<TimetablePageProps> = ({ index }) => {
	const client = useApiClient()
	const selectedUserId = useGetSelectedUserId()

	const { monday, friday } = useTimetableWeekRange(index)

	const { data, isLoading } = useQuery({
		queryKey: [
			"timetableWeekItem",
			selectedUserId,
			{
				from: monday.toISOString().substring(0, 10),
				to: friday.toISOString().substring(0, 10),
			},
		],
		queryFn: async () => {
			return await client
				.getTimetableByDate(
					{
						from: monday,
						to: friday,
					},
					selectedUserId
				)
				.then((res) => res.data)
		},
	})

	if (isLoading) return <Spinner size="large" />
	if (data?.data) return <TimetableGrid data={data?.data} />
	return <Text color={"red"}>No Content loaded</Text>
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderLeftWidth: 2,
		height: "100%",
		width: "100%",
	},
})

export default memo(TimetablePageView, (oldProps, newProps) => {
	return oldProps.index === newProps.index
})
