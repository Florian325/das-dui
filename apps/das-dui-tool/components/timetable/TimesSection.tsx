import { memo } from "react"
import { StyleSheet } from "react-native"

import { useQuery } from "@tanstack/react-query"

import { View } from "tamagui"

import TimeSectionItem from "@/components/timetable/TimeSectionItem"
import TimetableTopBarContainer from "@/components/timetable/TimetableTopBarContainer"
import useApiClient from "@/hooks/useApiClient"

const TimesSection = () => {
	const client = useApiClient()

	const { data } = useQuery({
		queryKey: ["timetableTimes"],
		queryFn: client.getTimesCleanedUp,
	})

	return (
		<View
			style={styles.container}
			theme={"alt1"}
			borderColor={"$placeholderColor"}
		>
			<TimetableTopBarContainer />
			{data?.map((time, i) => <TimeSectionItem key={i} item={time} />)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderRightWidth: 0.5,
		zIndex: 3,
	},
})

export default memo(TimesSection)
