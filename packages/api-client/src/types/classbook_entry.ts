export interface Meta {
	displayname: string
	users_count?: null
	shortname?: string
	color?: string
	name?: string
	description?: string
	label?: string
	hour?: string
	lesson_kind?: null
	is_canceled?: boolean
	last_updated_at?: null
}

export interface Can {
	"view-members"?: number
	"view-absences"?: number
	"view-entries"?: number
	"view-notices"?: number
	"export-notices"?: number
	"view-homeworks"?: number
	"view-analytics"?: number
	"create-absences"?: number
	"create-absence-comment"?: number
	"view-topic"?: number
	"update-topic"?: number
	"view-topic-history"?: number
	"update-notices"?: number
	"update-homeworks"?: number
	"view-entry-users"?: number
	"update-entry-users"?: number
	update?: number
	delete?: number
	"view-history"?: number
}

export interface Grade {
	id: number
	shortcut: string
	school_id: number
	schoolyear_id: number
	meta: Meta
	can: Can
	name: string
	description?: null
	level?: null
	future_shortcut?: null
	bookable_id?: null
	migrate_at?: null
}

export interface Bookable {
	meta: Meta
	id: number
	school_id: number
	type: string
	shortcut: string
	name: string
	description: string
	is_custom: boolean
	is_public: boolean
	is_confirmable: boolean
	capacity: number
	user_id?: null
}

export interface Subject {
	color: string
	meta: Meta
	id: number
	shortcut: string
	name: string
}

export interface Course {
	meta: Meta
	subject: Subject
	id: number
	name?: null
	description?: null
	subject_id: number
}

export interface User {
	id: number
	meta: Meta
}

export interface Topic {
	id: number
	message: string
	entry_id: number
	updated_at: string
	user: User
	meta: Meta
}

export interface EditedBy {
	id: number
	meta: Meta
}

export interface SourceEntry {
	id: number
	course: Course
	meta: Meta
}

export interface Homework {
	id: number
	message: string
	updated_at: string
	deleted_at?: null
	user: User
	edited_by: EditedBy
	can: Can
	source_entry: SourceEntry
	meta: Meta
	user_id: number
	expires_at: string
	effort: number
	source_entry_id: number
	target_entry_id?: null
	created_at: string
	edited_by_id: number
}

export interface ClassbookEntry {
	id: number
	classbook_id: number
	lesson_id: number
	course_id: number
	date: string
	grades: Grade[]
	bookables: Bookable[]
	course: Course
	teacher_shortcuts: number[]
	can: Can
	begins_at: string
	deleted_at?: null
	ends_at: string
	meta: Meta
	topic?: Topic
	homeworks?: Homework[]
}
