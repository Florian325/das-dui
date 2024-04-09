export interface CloudFileMeta {
	subtitle: string
	absolute_path: string
	location: Location
	files_count: number
	parent: Cloud | null
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
	username: string
}

export interface CloudFile {
	user_id: number
	meta: CloudFileMeta
	parent: CloudFile | null
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
	reserved: null
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
	user: User
	cloud: Cloud
}

export interface Cloud {
	id: number
	disabled_at: null
	updated_at: Date
}

export interface User {
	id: number
	school_id: number
	type: string
}
