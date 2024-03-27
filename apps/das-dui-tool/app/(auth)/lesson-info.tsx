import { StyleSheet } from "react-native"
import { Link, router, useFocusEffect, useNavigation } from "expo-router"
import { StatusBar } from "expo-status-bar"
import {
	H5,
	ListItem,
	ListItemSubtitle,
	Separator,
	Spinner,
	Text,
	YGroup,
	YStack,
	styled,
} from "tamagui"
import { useGetLessonInfo } from "@/context/lesson-info"
import { FC, useCallback } from "react"
import { useQuery } from "@tanstack/react-query"

import useDateFromSeconds from "@/hooks/useDateFromSeconds"
import useApiClient from "@/hooks/useApiClient"
import { ClassbookEntryResponse, TimetableResponse } from "@das-dui/api-client"

const ListItemSubtitleCanceled = styled(ListItemSubtitle, {
	color: "$red",
	theme: "red_alt1",
	textDecorationLine: "line-through",
})

interface DigitalClassbookSectionProps {
	classbookEntry: ClassbookEntryResponse.ClassbookEntry
}

const DigitalClassbookSection: FC<DigitalClassbookSectionProps> = ({
	classbookEntry,
}) => {
	return (
		<YGroup alignSelf="center" bordered separator={<Separator />}>
			<YGroup.Item>
				<ListItem
					hoverTheme
					pressTheme
					title="Learning Material"
					subTitle={classbookEntry.topic?.message}
				>
					{/* <ListItem.Text>
						{classbookEntry.topic?.message}
					</ListItem.Text> */}
				</ListItem>
			</YGroup.Item>
			<YGroup.Item>
				<ListItem hoverTheme pressTheme title="Homework">
					{classbookEntry.homeworks?.map((homework) => (
						<ListItem.Subtitle key={homework.id}>
							{homework.message} (due:{" "}
							{new Date(homework.expires_at).toLocaleString(
								"de",
								{ dateStyle: "short" }
							)}
							) ({homework.effort} Minutes)
						</ListItem.Subtitle>
					))}
				</ListItem>
			</YGroup.Item>
		</YGroup>
	)
}

interface DigitalClassbookRootProps {
	lesson: Pick<TimetableResponse.Lesson, "id" | "begins_at">
}

const DigitalClassbookRoot: FC<DigitalClassbookRootProps> = ({ lesson }) => {
	const client = useApiClient()
	const date = useDateFromSeconds(lesson.begins_at)
	const { data, isLoading } = useQuery({
		queryKey: ["classbook-entry", { lessonId: lesson.id }],
		queryFn: async () =>
			client.getClassbookEntry({ lessonId: lesson.id, date: date }),
	})

	return (
		<YStack>
			<H5>Digital Classbook</H5>
			{isLoading ? (
				<Spinner />
			) : data ? (
				<DigitalClassbookSection classbookEntry={data} />
			) : (
				<Text>
					There is no digital classbook entry for this lesson.
				</Text>
			)}
		</YStack>
	)
}

export default function LessonInfo() {
	const navigation = useNavigation()
	const lessonInfo = useGetLessonInfo()

	useFocusEffect(
		useCallback(() => {
			navigation.setOptions({
				title: lessonInfo?.meta.displayname,
			})
		}, [lessonInfo?.meta.displayname])
	)

	const isPresented = router.canGoBack()
	console.log(isPresented)

	if (!lessonInfo) return <Text>No Lesson Info available</Text>

	return (
		<YStack style={styles.container} p={"$5"} gap={"$5"}>
			<YGroup
				alignSelf="center"
				bordered
				size="$5"
				separator={<Separator />}
			>
				<YGroup.Item>
					<ListItem
						hoverTheme
						pressTheme
						title="Room"
						subTitle={
							<>
								{lessonInfo?.bookables.map((bookable) => (
									<ListItemSubtitle key={bookable.id}>
										{bookable.shortcut}
									</ListItemSubtitle>
								))}
								{lessonInfo.referenced_target_lessons.map(
									(lesson) =>
										lesson.bookables
											.filter(
												(value) =>
													!lessonInfo.bookables.find(
														(item) =>
															item.id === value.id
													)
											)
											.map((bookables) => (
												<ListItemSubtitleCanceled
													key={bookables.id}
												>
													{bookables.shortcut}
												</ListItemSubtitleCanceled>
											))
								)}
							</>
						}
					/>
				</YGroup.Item>
				<YGroup.Item>
					<ListItem
						hoverTheme
						pressTheme
						title="Teacher"
						subTitle={
							<>
								{lessonInfo.teachers.map((teacher) => (
									<ListItemSubtitle key={teacher.id}>
										{teacher.shortcut}
									</ListItemSubtitle>
								))}
								{lessonInfo.referenced_target_lessons.map(
									(lesson) =>
										lesson.teachers
											.filter(
												(value) =>
													!lessonInfo.teachers.find(
														(item) =>
															item.id === value.id
													)
											)
											.map((teacher) => (
												<ListItemSubtitleCanceled
													key={teacher.id}
												>
													{teacher.shortcut}
												</ListItemSubtitleCanceled>
											))
								)}
							</>
						}
					/>
				</YGroup.Item>
				<YGroup.Item>
					<ListItem
						hoverTheme
						pressTheme
						title="Grade"
						subTitle={
							<>
								{lessonInfo.grades.map((grade) => (
									<ListItemSubtitle key={grade.id}>
										{grade.shortcut}
									</ListItemSubtitle>
								))}
								{lessonInfo.referenced_target_lessons.map(
									(lesson) =>
										lesson.grades
											.filter(
												(value) =>
													!lessonInfo.grades.find(
														(item) =>
															item.id === value.id
													)
											)
											.map((grade) => (
												<ListItemSubtitleCanceled
													key={grade.id}
												>
													{grade.shortcut}
												</ListItemSubtitleCanceled>
											))
								)}
							</>
						}
					/>
				</YGroup.Item>
			</YGroup>
			<DigitalClassbookRoot lesson={lessonInfo} />

			{/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
			{!isPresented && <Link href="../">Dismiss</Link>}
			<Link href="../">Back</Link>
			{/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
			<StatusBar style="light" />
		</YStack>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
})
