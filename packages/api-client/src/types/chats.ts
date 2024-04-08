/* eslint-disable @typescript-eslint/no-explicit-any */
interface Chats {
	meta: ChatsMeta
	can: { [key: string]: number }
	code: string
	activity_at: Date
	updated_at: Date
	expires_at: null
	users_count: number
	admin_ids: number[]
	chat: Chat
	cloud: Cloud
	id: number
	name: string
	description?: string
	description_members?: string
	subtitle: null
	type: string
	uuid: string
	user_id?: null
	school_id: number
	chat_id: number
	cloud_id: number
	calendar_id: number
	target?: string
	intern_id?: string
	avatar: null
	icon: null
	color: null
	is_leavable: boolean
	is_public: boolean
	is_disabled: boolean
	is_twoway: boolean
	is_hidden_memberlist: boolean
	twoway_expires_at: null
	expiration_reason: null
	trashed_at: null
	created_at: Date
	group?: string
	disabled_by_id: null
	content_move_decision_made_at: null
	pivot: Pivot
	school: School
}

interface Chat {
	meta: any[]
	can: ChatCan
	id: number
	disabled_at: null
	updated_at: Date
}

interface ChatCan {
	"post-message": number
	"toggle-oneway": number
}

interface Cloud {
	meta: CloudMeta
	can: CloudCan
	id: number
	disabled_at: null
	updated_at: Date
}

interface CloudCan {
	upload: number
	"create-protected-folder": number
}

interface CloudMeta {
	download: null
	upload: string
	rename: string
	upload_limit: number
	max_number: number
	forbidden: Forbidden[]
}

enum Forbidden {
	Application = "application",
	Bat = "bat",
	COM = "com",
	Cmd = "cmd",
	Cpl = "cpl",
	Dmg = "dmg",
	Exe = "exe",
	Gadget = "gadget",
	Hta = "hta",
	Jar = "jar",
	MSI = "msi",
	Msc = "msc",
	Msp = "msp",
	Pif = "pif",
	Scf = "scf",
	Scr = "scr",
}

interface ChatsMeta {
	last_unread_count: number
	is_official: boolean
	is_muted: boolean
	is_paused: boolean
	is_archived: number
	is_pinned: boolean
	is_movable: boolean
	read_at: Date
	languages: any[]
	last_knocked_at: null
	next_possible_knock_at: NextPossibleKnockAt
	is_unread: boolean
	subtitle: string
	description: string
	displayname: string
	shortcut: string
	user_type?: string
	user_id?: number
}

interface NextPossibleKnockAt {}

interface Pivot {
	user_id: number
	channel_id: number
	color: string
	method: string
	last_activity_at: null
}

interface School {
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
	type: SchoolType
}

interface SchoolType {
	key: string
	name: string
	level: string
}

export type {
	Chats,
	Chat,
	ChatCan,
	Cloud,
	CloudCan,
	CloudMeta,
	ChatsMeta,
	Forbidden,
	Pivot,
	School,
	SchoolType,
}
