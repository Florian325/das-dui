import { FC } from "react"

import { Card, H4, H6, getTokens } from "tamagui"

import { FlashList } from "@shopify/flash-list"

import { TeacherStats } from "@/lib/getTeachersStats"

const DisplayTeacherStats: FC<{ stats: TeacherStats[] }> = ({ stats }) => {
	const $space = getTokens().space

	return (
		<FlashList
			data={stats}
			contentContainerStyle={{
				paddingHorizontal: $space.$4.val,
				paddingVertical: $space.$2.val,
			}}
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
							Attendent Lessons: {item.stats.attendentLessons}
						</H6>
						<H6 theme={"red_alt1"}>
							Cancelled Lessons: {item.stats.cancelledLessons}
						</H6>
						<H6 theme={"orange_alt1"}>
							Substituted Lessons: {item.stats.substitutedLessons}
						</H6>
					</Card.Footer>
				</Card>
			)}
			estimatedItemSize={200}
		/>
	)
}

export default DisplayTeacherStats
