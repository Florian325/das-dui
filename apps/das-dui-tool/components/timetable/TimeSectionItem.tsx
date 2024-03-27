import useDateFromSeconds from "@/hooks/useDateFromSeconds"
import useTimeDifferenceHeight from "@/hooks/useTimeDifferenceHeight"
import { TimetableTimeResponse } from "@das-dui/api-client"
import { FC } from "react"
import { StyleSheet } from "react-native"
import { Text, View } from "tamagui"

interface TimeSectionItemProps {
	item: TimetableTimeResponse.TimetableTime
}

const TimeSectionItem: FC<TimeSectionItemProps> = ({ item }) => {
	const startTime = useDateFromSeconds(item.begins_at)
	const endTime = useDateFromSeconds(item.ends_at)

	const timeDiff = useTimeDifferenceHeight({
		startTime: startTime,
		endTime: endTime,
	})

	if (item.type === "LESSON")
		return (
			<View
				height={timeDiff}
				style={styles.lesson}
				borderColor={"$placeholderColor"}
			>
				<Text theme={"active"}>
					{startTime.toLocaleTimeString("en-GB", {
						timeStyle: "short",
					})}
				</Text>

				<Text>{item.meta.displayname}</Text>
				<Text theme={"active"}>
					{endTime.toLocaleTimeString("en-GB", {
						timeStyle: "short",
					})}
				</Text>
			</View>
		)

	return (
		<View
			height={timeDiff}
			style={styles.break}
			borderColor={"$placeholderColor"}
		></View>
	)
}

const styles = StyleSheet.create({
	lesson: {
		borderBottomWidth: 0.5,
		paddingHorizontal: 8,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
	break: {
		borderBottomWidth: 0.5,
	},
})

export default TimeSectionItem
