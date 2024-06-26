import { useCallback } from "react"
import { RefreshControl, StyleSheet } from "react-native"

import { useIsFetching, useQueryClient } from "@tanstack/react-query"

import { ScrollView, View } from "tamagui"

import TimesSection from "@/components/timetable/TimesSection"
import TimetablePageView from "@/components/timetable/TimetablePage"
import CustomInfiniteViewPager from "@/lib/CustomInfiniteViewPager"

export default function TimetableView() {
	const queryClient = useQueryClient()
	const fetching = useIsFetching({
		queryKey: ["timetableWeekItem"],
	})

	const refetchTimetable = useCallback(async () => {
		await queryClient.invalidateQueries({
			queryKey: ["timetableWeekItem"],
		})
	}, [])

	return (
		<View style={styles.container}>
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={Boolean(fetching)}
						onRefresh={refetchTimetable}
					/>
				}
			>
				<View style={styles.timetableSection}>
					<TimesSection />
					<CustomInfiniteViewPager
						pageBuffer={2}
						PageComponent={TimetablePageView}
					/>
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	timetableSection: {
		flex: 1,
		width: "100%",
		height: "100%",
		flexDirection: "row",
	},
})
