import { TimetableResponse } from "@das-dui/api-client"

export interface TeacherStats {
	teacherId: number
	teacherName: string
	stats: {
		totalLessons: number
		attendentLessons: number
		cancelledLessons: number
		substitutedLessons: number
	}
}

export const getTeachersStats = async (
	data: Promise<TimetableResponse.Lesson[]>
): Promise<TeacherStats[]> => {
	const stats = new Map<
		number,
		{
			teacherId: number
			teacherName: string
			stats: {
				totalLessons: number
				attendentLessons: number
				cancelledLessons: number
				substitutedLessons: number
			}
		}
	>()

	;(await data).forEach((lesson) => {
		if (lesson.kind === "HOLIDAY") return
		const teachers =
			lesson.kind === "CANCLED"
				? lesson.referenced_target_lessons[0].teachers
				: lesson.teachers
		teachers.forEach((teacher) => {
			const teacherId = teacher.id
			if (!stats.has(teacherId)) {
				stats.set(teacherId, {
					teacherId: teacher.id,
					teacherName: teacher.name,
					stats: {
						totalLessons: 0,
						attendentLessons: 0,
						cancelledLessons: 0,
						substitutedLessons: 0,
					},
				})
			}
			const teacherStats = stats.get(teacherId)!
			teacherStats.stats.totalLessons++
			if (lesson.kind == "CANCLED") {
				teacherStats.stats.cancelledLessons++
			} else if (lesson.kind == "SUBSTITUTION") {
				teacherStats.stats.substitutedLessons++
			} else if (lesson.kind === null) {
				teacherStats.stats.attendentLessons++
			}
		})
	})

	return Array.from(stats.values()).sort((a, b) =>
		a.stats.cancelledLessons > b.stats.cancelledLessons ? -1 : 1
	)
}
