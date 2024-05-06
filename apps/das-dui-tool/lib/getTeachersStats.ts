import { TimetableResponse } from "@das-dui/api-client"

export interface TeacherStats {
	teacherId: number
	teacherName: string
	stats: {
		totalLessons: number
		attendedLessons: number
		unAttendedLessons: number
	}
}

export const getTeachersStats = async (
	data: Promise<TimetableResponse.Lesson[]>
): Promise<TeacherStats[]> => {
	const stats = new Map<number, TeacherStats>()

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
						attendedLessons: 0,
						unAttendedLessons: 0,
					},
				})
			}
			const teacherStats = stats.get(teacherId)!
			teacherStats.stats.totalLessons++
			if (lesson.kind === null) {
				teacherStats.stats.attendedLessons++
			} else {
				teacherStats.stats.unAttendedLessons++
			}
		})
	})

	return Array.from(stats.values()).sort((a, b) =>
		a.stats.unAttendedLessons > b.stats.unAttendedLessons ? -1 : 1
	)
}
