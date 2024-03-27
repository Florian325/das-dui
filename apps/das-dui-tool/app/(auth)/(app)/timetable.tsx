import TimesSection from "@/components/timetable/TimesSection"
import { StyleSheet } from "react-native"
import { ScrollView, View } from "tamagui"
import TimetablePageView from "@/components/timetable/TimetablePage"
import CustomInfiniteViewPager from "@/lib/CustomInfiniteViewPager"

export default function TimetableView() {
	return (
		<View style={styles.container}>
			<ScrollView>
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
