import { UserResponse } from "."

interface Member {
	method: string
	is_admin: number
	color: string
	joined_at: Date
	activity_at: Date
	can: MemberCan
	id: number
	school_id: number
	type: string
	title: null | string
	state: string
	expire_at: null
	locale: string
	shortcut: ShortcutClass | null
	shortcut_id: number | null
	grade: Grade | null
	grade_id: number | null
	meta: MemberMeta
}

interface MemberCan {
	message: number
	view: number
}

interface Grade
	extends Pick<
		UserResponse.Grade,
		| "id"
		| "school_id"
		| "shortcut"
		| "name"
		| "description"
		| "level"
		| "future_shortcut"
		| "bookable_id"
		| "migrate_at"
	> {
	meta: GradeMeta
}

interface GradeMeta {
	displayname: string
}

interface MemberMeta {
	displayname: string
	subtitle: string
	type: string
	uri: string
	salutation: string
	days_until_deletion: number
	is_signed: boolean
	is_paused: boolean
	deleted_at: null
	is_ping_opted_out?: number
	is_trackable_classbook_user?: boolean
}

interface ShortcutClass {
	id: number
	school_id: number
	shortcut: string
	name: string
	description: null
	meta: GradeMeta
}

export type { Member, Grade, MemberMeta, ShortcutClass, GradeMeta, MemberCan }
