export interface Survey {
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
