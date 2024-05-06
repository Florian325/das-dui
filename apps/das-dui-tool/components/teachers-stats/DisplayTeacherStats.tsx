import { FC } from "react"

import { Card, H4, H6, getTokens } from "tamagui"

import { FlashList } from "@shopify/flash-list"

import { TeacherStats } from "@/lib/getTeachersStats"

const DisplayTeacherStats: FC<{
	stats: TeacherStats[]
	refetchFn: () => void
	isRefetching: boolean
}> = ({ stats, refetchFn, isRefetching }) => {
	const $space = getTokens().space

	return (
		<FlashList
			data={stats}
			contentContainerStyle={{
				paddingHorizontal: $space.$4.val,
				paddingVertical: $space.$2.val,
			}}
			refreshing={isRefetching}
			onRefresh={refetchFn}
			renderItem={({ item }) => (
				<Card
					key={item.teacherId}
					pressTheme
					hoverTheme
					elevate
					my="$2"
				>
					<Card.Header>
						<H4 theme={"alt1"}>{item.teacherName}</H4>
					</Card.Header>
					<Card.Footer padded flexDirection="column">
						<H6>Total Lessons: {item.stats.totalLessons}</H6>
						<H6 theme={"green_alt1"}>
							Attended Lessons: {item.stats.attendedLessons}
						</H6>
						<H6 theme={"red_alt1"}>
							Unattended Lessons: {item.stats.unAttendedLessons}
						</H6>
						<H6 theme={"orange_alt1"}>
							Attendance Rate:{" "}
							{(
								(item.stats.attendedLessons /
									item.stats.totalLessons) *
								100
							).toFixed(1)}
							%
						</H6>
					</Card.Footer>
				</Card>
			)}
			estimatedItemSize={200}
		/>
	)
}

export default DisplayTeacherStats
