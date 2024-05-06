import { StyleSheet } from "react-native"

import { Spinner, Text, View } from "tamagui"

import DisplayTeacherStats from "@/components/teachers-stats/DisplayTeacherStats"
import { useTeachersStatsQuery } from "@/hooks/queries/useTeacherStatsQuery"

export default function StatsPage() {
	const { data, isLoading, refetch, isRefetching } = useTeachersStatsQuery()

	if (isLoading) {
		return (
			<View style={styles.container}>
				<Spinner />
			</View>
		)
	}
	if (!data) {
		return (
			<View style={styles.container}>
				<Text>Failed to load data</Text>
			</View>
		)
	}

	return (
		<DisplayTeacherStats
			stats={data}
			refetchFn={refetch}
			isRefetching={isRefetching}
		/>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
})
