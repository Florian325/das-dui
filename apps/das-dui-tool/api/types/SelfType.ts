/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SchoolType {
	key: string
	name: string
	level: string
}

export interface Timetable {
	id: number
	timetable_id: number
	key: string
	begins_at: string
	ends_at: string
	created_at: string
	updated_at: string
	pending_upload_group_id: null | number
	meta: {
		displayname: string
		is_active: boolean
		shortname: string
		files: any[] // You might want to replace `any[]` with a more specific type if possible
		grades_count: null | number
		courses_count: null | number
		subjects_count: null | number
		bookables_count: null | number
	}
	classbook: {
		can: Record<string, number>
		id: number
		schoolyear_id: number
	}
}

export interface School {
	id: number
	name: string
	name_alias: string
	slink: string
	state: string
	uuid: string
	url: string
	street: null | string
	is_beta: boolean
	is_partner: boolean
	shortcut: string
	locale: string
	environment: null | string
	app_branding: string
	old_id: null | number
	type: SchoolType
	meta: {
		subtitle: string
		uri: string
		logo_uri: string
		sdui_logo: string
		footer_menu: string[]
		news_channel_types: string[]
	}
	can: {
		"chat-translations": number
		"totp-2fa": number
	}
	auth_driver: null | string
	timetable: {
		schoolyears: Timetable[]
		provider: string
		can: Record<string, number>
		meta: {
			state: string
		}
		id: number
		process_started_at: string
		processed_at: string
		last_updated_at: string
		active_schoolyear_id: number
	}
}

export interface Properties {
	[key: string]: string | number | boolean | null
}

export interface ParentPivot {
	user_id: number
	parent_id: number
	relation: string
	created_at: string
	is_accessable: number
}

export interface Grade {
	id: number
	shortcut: string
	school_id: number
	schoolyear_id: number
	meta: {
		displayname: string
		users_count: null | number
	}
	can: Record<string, number>
	name: string
	description: null | string
	level: null | string
	future_shortcut: null | string
	bookable_id: null | number
	migrate_at: null | string
}

export interface Role {
	updated_at: string
	created_at: string
	id: number
	name: string
	key: string
	description: string
}

export interface PrimaryRole {
	translated_description: string
	updated_at: string
	created_at: string
	id: number
	name: string
	key: string
	description: string
}

export interface Meta {
	displayname: string
	subtitle: string
	type: string
	uri: string
	avatar_uri: string
	salutation: string
	days_until_deletion: number
	is_signed: boolean
	is_paused: boolean
	archived_at: null | string
	deleted_at: null | string
	is_ping_opted_out: number
	is_trackable_classbook_user: boolean
}

export interface Properties2 {
	[key: string]: string | number | boolean | null
}

export default interface SelfUser {
	data: {
		uuid: string
		firstname: string
		lastname: string
		email: string
		is_ghost: boolean
		is_trackable: boolean
		dob: null | string
		external_source_id: null | string
		tfa_mode: null | string
		permissions: any[] // You might want to replace `any[]` with a more specific type if possible
		school: School
		properties: Properties
	}
	bookable: null
	can: Record<string, number>
	child_pivot: any[] // You might want to replace `any[]` with a more specific type if possible
	parent_pivot: ParentPivot[]
	password_changed_at: string
	loggedin_at: string
	grade: Grade
	grade_id: number
	roles: Role[]
	primary_role: PrimaryRole
	id: number
	school_id: number
	username: null | string
	type: string
	title: string
	sex: string
	state: string
	expire_at: null | string
	locale: string
	shortcut: null | string
	shortcut_id: null | number
	meta: Meta
	code: string
	registered_at: string
	confirmed_at: null | string
	phone: null | string
}
