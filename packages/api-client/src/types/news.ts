interface User {
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

interface Channel {
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

interface Attachment {
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

interface Preview {
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

interface Meta {
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

interface Can {
	update: number
	"view-statistics": number
	confirm: number
	notify: number
	delete: number
	pin: number
}

interface ChannelPivot {
	news_id: number
	channel_id: number
}

interface Survey {
	can: {
		view: number
		vote: number
		revoke: number
		results: number
		download: number
		end: number
		delete: number
	}
	meta: {
		is_over: boolean
		options: {
			uuid: string
			name: string
			is_chosen: boolean
		}[]
		is_user_voted: boolean
		csv: string
		xls: string
		languages: string[]
	}
	question: string
	id: number
	uuid: string
	is_multi_answerable: boolean
	is_anonymous: boolean
	is_freetext: boolean
	results_visibility: string
	has_translations: boolean
	created_at: string
	updated_at: string
	expires_at?: string | null
	ended_at?: string | null
	deleted_at?: string | null
	user: {
		id: number
		school_id: number
		type: string
	}
}

interface NewsMeta {
	userMeta: Meta
}

interface News {
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

export type {
	News,
	User,
	Channel,
	Attachment,
	Preview,
	Meta,
	Can,
	ChannelPivot,
	Survey,
}
