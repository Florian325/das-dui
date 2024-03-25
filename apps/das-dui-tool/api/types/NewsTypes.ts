import SurveyType from "./SurveyType"

export default interface NewsType {
	id: number
	title: null | string
	content: string
	has_translations: boolean
	survey_uuid: null | string
	is_confirmable: boolean
	is_public: boolean
	is_official: number
	is_pinned: boolean
	publish_at: null
	has_emergency_sms: boolean
	content_rendered: string
	user: User
	channels: Channel[]
	channel_pivot: Pivot[]
	survey?: SurveyType | null
	updated_at: Date
	created_at: Date
	attachments: Attachment[]
	preview?: Attachment // | string
	meta: DatumMeta
	can: Can
}

export interface Attachment {
	id: number
	uuid: string
	user_id: number
	source_id: number
	source_type: string
	name: string
	type: string
	extension: string
	size: number
	created_at: Date
	updated_at: Date
	file_type: string
	meta: AttachmentMeta
}

export interface AttachmentMeta {
	uri: string
	download_uri: string
	temp_uri: string
}

export interface Can {
	update: number
	"view-statistics": number
	confirm: number
	notify: number
	delete: number
	pin: number
}

export interface Pivot {
	news_id: number
	channel_id: number
}

export interface Channel {
	meta: ChannelMeta
	id: number
	name: string
	description: null | string
	description_members: null | string
	subtitle: null
	type: ChannelType
	uuid: string
	user_id: number | null
	school_id: number
	chat_id: number
	cloud_id: number
	calendar_id: number
	target: string | null
	intern_id: null | string
	avatar: null
	icon: null
	color: null
	is_leavable: boolean
	is_public: boolean
	is_disabled: boolean
	is_twoway: boolean
	is_hidden_memberlist: boolean
	twoway_expires_at: null
	activity_at: Date
	expires_at: null
	expiration_reason: null
	trashed_at: null
	created_at: Date
	updated_at: Date
	group: string | null
	disabled_by_id: null
	content_move_decision_made_at: null
	pivot: Pivot
	school: School
}

export interface ChannelMeta {
	is_official: number
	subtitle: string
	displayname: string
	shortcut: string
	user_type?: string
	user_id?: number
}

export interface School {
	id: number
	name: string
	name_alias: string
	slink: string
	state: string
	uuid: string
	url: string
	street: null
	is_beta: boolean
	is_partner: boolean
	shortcut: string
	locale: string
	environment: null
	app_branding: string
	old_id: null
	type: string
}

export enum ChannelType {
	Chat = "CHAT",
	Custom = "CUSTOM",
	Generated = "GENERATED",
	Global = "GLOBAL",
}

export interface DatumMeta {
	uri: string
	confirm_uri: boolean
	is_confirmed: boolean
	languages: string[]
	csv: string
	xls: string
	statistics: Statistics
}

export interface Statistics {
	readby: Confirmed
	confirmed: Confirmed
}

export interface Confirmed {
	total: number
	current: number
}

export interface User {
	id: number
	school_id: number
	type: string
	title: null
	state: string
	expire_at: null
	locale: string
	shortcut: ShortcutClass | null
	shortcut_id: number | null
	grade: null
	grade_id: null
	meta: UserMeta
}

export interface UserMeta {
	displayname: string
	subtitle: string
	type: string
	uri: string
	salutation: string
	days_until_deletion: number
	is_signed: boolean
	is_paused: boolean
	deleted_at: null
}

export interface ShortcutClass {
	id: number
	school_id: number
	shortcut: string
	name: string
	description: null
	meta: ShortcutMeta
}

export interface ShortcutMeta {
	displayname: string
}
