/* eslint-disable @typescript-eslint/no-explicit-any */
import { News } from "./news"

export interface ChatMessagePreview {
	title?: string
	description?: string
	link?: string
	type: "link" | string
}

export interface ChatMessage {
	payload: null
	created_at: Date
	updated_at: Date
	unset_at: Date | null
	content: string
	content_rendered: string
	user_id: number
	user: User
	file_uuid: string
	file: File | null
	reply_uuid: string
	reply: null
	preview: ChatMessagePreview | null
	can: ChatMessageCan
	target: Pick<User, "id" | "school_id" | "type"> | News | null
	target_snapshot: null
	actions: any[]
	is_read: boolean
	uuid: string
	chat_id: number
	original_uuid: null
	type: "HINT" | "MESSAGE" | string
	target_type: "user" | "news" | null
	deleted_at: null
}

export interface ChatMessageCan {
	update: number
	translate: number
	"view-readers-list": number
	delete: number
}

export interface FileMeta {
	subtitle: string
	absolute_path: string
	location: Location
	files_count: number
	parent: File | null
	details_uri: string
	content_uri: string
	thumbnail_uri: null | string
	uri: string
	download_uri: string
	has_thumbnail: number
	has_video: number
	has_image: number
	has_audio: number
	has_text_document: number
	has_wopi_support: number
	edit_uri: null | string
	edit_access_token: null | string
	username: null | string
}

export interface File {
	user_id: number | null
	meta: FileMeta
	can: FileCan
	parent: File | null
	uuid: string
	cloud_id: number
	disk_id: null
	name: string
	description: null
	extension: null | string
	type: null | string
	hash: null | string
	size: number
	file_type: string
	is_protected_folder: number
	upload_limited_at: null
	_lft: number
	_rgt: number
	parent_id: null | string
	deleted_by_id: null
	reserved: string | null
	expires_at: null
	created_at: Date
	updated_at: Date
	referenced_uuid: null
	referenced_permissions: null
	referenced_until: null
	deleted_at: null
	has_thumbnail: number | null
	duration_in_seconds: null
	is_collaborative: boolean
	path: string
	user: FileUser | null
	cloud: Cloud
	messages: FileMessage[]
}

export interface FileCan {
	copy: number
	upload: number
	delete: number
	rename: number
	collaborate: number
	"change-collaboration": number
	download: number
	move: number
}

export interface Cloud {
	id: number
	disabled_at: null
	updated_at: Date
}

export interface FileMessage {
	uuid: string
	chat_id: number
	original_uuid: null
	user_id: number
	reply_uuid: null
	type: string
	target_type: null
	unset_at: null
	created_at: Date
	updated_at: Date
	deleted_at: null
}

export interface FileUser {
	id: number
	school_id: number
	type: string
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
	grade: Grade | null
	grade_id: number | null
	meta: UserMeta
}

export interface Grade {
	id: number
	school_id: number
	shortcut: string
	name: string
	description: null
	level: null
	future_shortcut: null
	bookable_id: null
	migrate_at: null
	meta: GradeMeta
}
export interface GradeMeta {
	displayname: string
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
	meta: GradeMeta
}
