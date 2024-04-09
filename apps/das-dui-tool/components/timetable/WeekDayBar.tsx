import { StyleSheet } from "react-native"

import { Text, View } from "tamagui"

import useTimetableWeekDayArray from "@/hooks/useTimetableWeekDayArray"

interface WeekDayBarProps {
	offset: number
}

const WeekDayBar = ({ offset }: WeekDayBarProps) => {
	const weekDays = useTimetableWeekDayArray(offset)
	return (
		<View style={styles.container}>
			{weekDays.map((day, i) => (
				<View
					key={i}
					style={styles.day}
					{...(day.toLocaleDateString() ==
						new Date().toLocaleDateString() && {
						theme: "active",
					})}
				>
					<Text>
						{day.toLocaleString("de", {
							month: "2-digit",
							day: "2-digit",
						})}
					</Text>
					<Text>
						{day.toLocaleDateString("de", {
							weekday: "short",
						})}
					</Text>
				</View>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
	},
	day: {
		flex: 1,
		width: "20%",
		padding: 2,
		alignItems: "center",
		justifyContent: "space-evenly",
	},
})

export default WeekDayBar
