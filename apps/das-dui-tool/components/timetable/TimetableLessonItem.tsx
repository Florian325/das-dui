import { Lesson } from "@/api/types/TimetableTypes"
import { useSetLessonInfo } from "@/context/lesson-info"
import { Link } from "expo-router"
import { StyleSheet } from "react-native"
import { Card, SizableText, ThemeName } from "tamagui"

const TimetableLessonItem = ({ lesson }: { lesson: Lesson }) => {
	const setLessonInfo = useSetLessonInfo()

	const lessonKinds = ["BOOKABLE_CHANGE", "CANCLED", "EVENT", "SUBSTITUTION"]
	const lessonKindThemes: { [key: string]: ThemeName } = {
		BOOKABLE_CHANGE: "orange",
		CANCLED: "red",
		EVENT: "green",
		SUBSTITUTION: "yellow",
	}

	return (
		<Link
			onPress={() => setLessonInfo(lesson)}
			href={"/lesson-info"}
			asChild
		>
			<Card
				// BOOKABLE_CHANGE
				// CANCLED
				// EVENT
				// SUBSTITUTION
				style={styles.lessonContainer}
				// Raum geändert
				// Event
				{...(lesson.kind && {
					theme:
						// lesson.kind === "CANCLED"
						// 	? "red"
						// 	: lesson.kind === "EVENT"
						// 	? "green"
						// 	: lesson.kind === "BOOKABLE_CHANGE"
						// 	? "yellow"
						// 	: "alt1",
						lessonKinds.includes(lesson.kind)
							? lessonKindThemes[lesson.kind]
							: "active",
				})}
			>
				<SizableText
					theme={"alt1"}
					fontSize={"$3"}
					lineHeight={"$1"}
					textDecorationLine={
						lesson.kind === "CANCLED" ? "line-through" : "none"
					}
				>
					{lesson.meta.shortname}
				</SizableText>
				<SizableText
					fontSize={"$1"}
					lineHeight={"$1"}
					{...((lesson.kind === "BOOKABLE_CHANGE" ||
						lesson.kind === "CANCLED") && {
						theme: "alt2",
						textDecorationLine:
							lesson.referenced_target_lessons[0]?.bookables[0]
								?.shortcut && lesson.kind !== "CANCLED"
								? "none"
								: "line-through",
					})}
				>
					{lesson.bookables[0]?.shortcut ||
						lesson.referenced_target_lessons[0]?.bookables[0]
							?.shortcut}
				</SizableText>
				<SizableText
					fontSize={"$1"}
					lineHeight={"$1"}
					{...((lesson.kind === "SUBSTITUTION" ||
						lesson.kind === "CANCLED") && {
						theme: "alt2",
						textDecorationLine:
							lesson.teachers[0]?.shortcut &&
							lesson.kind !== "CANCLED"
								? "none"
								: "line-through",
					})}
				>
					{lesson.teachers[0]?.shortcut ||
						lesson.referenced_target_lessons[0]?.teachers[0]
							?.shortcut}
				</SizableText>
			</Card>
		</Link>
	)
}

const styles = StyleSheet.create({
	lessonContainer: {
		// backgroundColor: "red",
		flex: 1,
		padding: 2,
		alignItems: "center",
		justifyContent: "space-between",
		gap: 0,
		overflow: "hidden",
		// borderRadius: 5,
		elevation: 5,
	},
})

export default TimetableLessonItem
