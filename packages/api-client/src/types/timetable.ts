export interface Teacher {
	id: number
	name: string
	shortcut: string
}

export interface Bookable {
	id: number
	name: string
	shortcut: string
}

export interface Grade {
	id: number
	name: string
	shortcut: string
}

export interface CourseMeta {
	displayname: string
	shortname: string
	color: string
	name: string
	description: string
}

export interface CourseSubject {
	color: string
	meta: {
		displayname: string
	}
	id: number
	shortcut: string
	name: string
}

export interface Course {
	meta: CourseMeta
	subject: CourseSubject
	id: number
	name: string | null
	description: string | null
	subject_id: number
}

export interface LessonMeta {
	displayname_hour: string
	moved_comment: string
	displayname: string
	shortname: string
	displayname_kind: string
}

export interface Lesson {
	bookables: Bookable[]
	grades: Grade[]
	teachers: Teacher[]
	kind: LessonKind | string | null
	referenced_target_lessons: Lesson[]
	id: number
	begins_at: number
	ends_at: number
	comment: string
	course: Course
	meta: LessonMeta
}

enum LessonKind {
	BOOKABLE_CHANGE = "BOOKABLE_CHANGE",
	CANCLED = "CANCLED",
	EVENT = "EVENT",
	SUBSTITUTION = "SUBSTITUTION",
}

export interface Timetable {
	lessons: Lesson[]
	last_updated_at: string
}
