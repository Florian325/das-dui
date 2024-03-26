import { Spinner, Text, View } from "tamagui"
import { memo } from "react"
import { useQuery } from "@tanstack/react-query"
import useTimetableWeekRange from "@/hooks/useTimetableWeekRange"
import TimeTableGrid from "./TimeTableGrid"
import { StyleSheet } from "react-native"
import TimetableTopBarContainer from "./TimetableTopBarContainer"
import WeekDayBar from "./WeekDayBar"
import { useGetSelectedUserId } from "@/context/userId"
import useApiClient from "@/hooks/useApiClient"

const TimetablePagerView = ({ index }: { index: number }) => {
	return (
		<View style={styles.container} borderColor={"$placeholderColor"}>
			<TimetableTopBarContainer>
				<WeekDayBar offset={index} />
			</TimetableTopBarContainer>
			<TimetablePager index={index} />
		</View>
	)
}

const TimetablePager = ({ index }: { index: number }) => {
	console.log("Render Timetable Pager", index)
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
	return (
		<>
			<>
				{data?.data ? (
					<TimeTableGrid data={data?.data} />
				) : (
					<Text color={"red"}>No Content loaded</Text>
				)}
			</>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderLeftWidth: 2,
		height: "100%",
		width: "100%",
		// backgroundColor: "blue",
	},
})

// export default TimetablePagerView

export default memo(TimetablePagerView, (oldProps, newProps) => {
	return oldProps.index === newProps.index
})

// export memo(TimetablePager, (oldProps, newProps) => {
// 	return oldProps.index === newProps.index
// })
