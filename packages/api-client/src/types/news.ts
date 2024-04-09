import { Survey } from "./survey"

export interface User {
	id: number
	school_id: number
	type: string
	title?: string
	state: string
	expire_at?: string
	locale: string
	shortcut: {
		id: number
		school_id: number
		shortcut: string
		name: string
		description?: string
		meta: {
			displayname: string
		}
	}
	shortcut_id: number
	grade?: string
	grade_id?: number
	meta: {
		displayname: string
		subtitle: string
		type: string
		uri: string
		salutation: string
		days_until_deletion: number
		is_signed: boolean
		is_paused: boolean
		deleted_at?: string
	}
}

export interface Channel {
	meta: {
		is_official: number
		subtitle: string
		displayname: string
		shortcut: string
	}
	id: number
	name: string
	description: string
	description_members: string
	subtitle?: string
	type: string
	uuid: string
	user_id?: number
	school_id: number
	chat_id: number
	cloud_id: number
	calendar_id: number
	target: string
	intern_id: string
	avatar?: string
	icon?: string
	color?: string
	is_leavable: boolean
	is_public: boolean
	is_disabled: boolean
	is_twoway: boolean
	is_hidden_memberlist: boolean
	twoway_expires_at?: string
	activity_at: string
	expires_at?: string
	expiration_reason?: string
	trashed_at?: string
	created_at: string
	updated_at: string
	group?: string
	disabled_by_id?: number
	content_move_decision_made_at?: string
	pivot: {
		news_id: number
		channel_id: number
	}
	school: {
		id: number
		name: string
		name_alias: string
		slink: string
		state: string
		uuid: string
		url: string
		street?: string
		is_beta: boolean
		is_partner: boolean
		shortcut: string
		locale: string
		environment?: string
		app_branding: string
		old_id?: number
		type: {
			key: string
			name: string
			level: string
		}
	}
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
	created_at: string
	updated_at: string
	file_type: string
	meta: {
		uri: string
		download_uri: string
		temp_uri: string
	}
}

export interface Preview {
	id: number
	uuid: string
	user_id: number
	source_id: number
	source_type: string
	name: string
	type: string
	extension: string
	size: number
	created_at: string
	updated_at: string
	file_type: string
	meta: {
		uri: string
		download_uri: string
		temp_uri: string
	}
}

export interface Meta {
	uri: string
	confirm_uri: boolean
	is_confirmed: boolean
	languages: string[]
	csv: string
	xls: string
	statistics: {
		readby: {
			total: number
			current: number
		}
		confirmed: {
			total: number
			current: number
		}
	}
}

export interface Can {
	update: number
	"view-statistics": number
	confirm: number
	notify: number
	delete: number
	pin: number
}

export interface ChannelPivot {
	news_id: number
	channel_id: number
}

export interface NewsMeta {
	userMeta: Meta
}

export interface News {
	id: number
	title: string
	content: string
	has_translations: boolean
	survey_uuid?: string
	is_confirmable: boolean
	is_public: boolean
	is_official: number
	is_pinned: boolean
	publish_at?: string
	has_emergency_sms: boolean
	content_rendered: string
	user: User
	channels: Channel[]
	channel_pivot: ChannelPivot[]
	survey?: Survey
	updated_at: string
	created_at: string
	attachments: Attachment[]
	preview: Preview
	meta: NewsMeta
	can: Can
}
