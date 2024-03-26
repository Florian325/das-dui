import useDateFromSeconds from "@/hooks/useDateFromSeconds"
import useTimeDifferenceHeight from "@/hooks/useTimeDifferenceHeight"
import { StyleSheet } from "react-native"
import TimetableLessonItem from "./TimetableLessonItem"
import { View } from "tamagui"
import { TimetableResponse, TimetableTimeResponse } from "@das-dui/api-client"

const TimetableBlockItem = ({
	item,
	lessons,
}: {
	item: TimetableTimeResponse.TimetableTime
	lessons: TimetableResponse.Lesson[]
}) => {
	const startTime = useDateFromSeconds(item.begins_at)
	const endTime = useDateFromSeconds(item.ends_at)

	const timeDiff = useTimeDifferenceHeight({
		startTime: startTime,
		endTime: endTime,
	})

	function getDay(seconds: number) {
		const d = new Date(0)
		d.setSeconds(seconds)
		d.setHours(d.getHours() + 2)
		return d.getDay()
	}

	const weekDays = [1, 2, 3, 4, 5]
	if (item.type === "LESSON")
		return (
			<View
				height={timeDiff}
				style={styles.lessonSection}
				borderColor={"$colorTransparent"}
			>
				{weekDays.map((day, i) => (
					<View key={i} style={styles.gridIitem}>
						{lessons
							?.filter(
								(lesson) => getDay(lesson.begins_at) == day
							)
							.map((lesson, i) => (
								<TimetableLessonItem key={i} lesson={lesson} />
							))}
					</View>
				))}
			</View>
		)
	return (
		<View
			height={timeDiff}
			style={styles.break}
			borderColor={"$colorTransparent"}
		/>
	)
}

const styles = StyleSheet.create({
	lessonSection: {
		borderBottomWidth: 0.5,
		// paddingHorizontal: 8,
		display: "flex",
		// flex: 1,
		// alignItems: "center",
		// justifyContent: "space-between",
		flexDirection: "row",
	},
	break: {
		borderBottomWidth: 0.5,
	},
	gridIitem: {
		flex: 1,
		width: "20%",
		flexGrow: 2,
		gap: 2,
		flexDirection: "row",
		padding: 2,
	},
	lessonItem: {
		// backgroundColor: "red",
		flex: 1,
		padding: 2,
		borderRadius: 5,
	},
})

export default TimetableBlockItem
