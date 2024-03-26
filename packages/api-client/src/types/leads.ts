interface Lead {
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
	old_id?: string
	has_sdui: boolean
	visited_count: number
	visited_teacher_count: number
	visited_parent_count: number
	visited_student_count: number
	is_locked: number
	city: string
	phase: string
	status: string
	phase_code: number
	pipedrive_id: number
	hubspot_id: string
}

export type { Lead }