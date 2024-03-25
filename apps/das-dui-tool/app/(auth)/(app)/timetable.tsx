import TimesSection from "@/components/timetable/TimesSection"
import { StyleSheet } from "react-native"
import { ScrollView, View } from "tamagui"
import TimetablePagerView from "@/components/timetable/TimetablePager"

import CustomInfiniteViewPager from "@/lib/CustomInfiniteViewPager"

export default function TimetableView() {
	return (
		<View style={{ flex: 1 }}>
			<ScrollView
				onStartShouldSetResponder={() => true}
				style={{ flex: 1 }}
			>
				<View style={styles.container}>
					<TimesSection />
					<CustomInfiniteViewPager
						pageBuffer={2}
						PageComponent={TimetablePagerView}
					/>
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// width: "100%",
		// height: "100%",
		flexDirection: "row",
	},
})
