interface SurveyOption {
	uuid: string
	name: string
	is_chosen: boolean
}

interface SurveyMeta {
	is_over: boolean
	options: SurveyOption[]
	is_user_voted: boolean
	csv: string
	xls: string
	languages: string[]
}

interface SurveyCan {
	view: number
	vote: number
	revoke: number
	results: number
	download: number
	end: number
	delete: number
}

interface SurveyUser {
	id: number
	school_id: number
	type: string
}

interface SurveyType {
	survey: {
		can: SurveyCan
		meta: SurveyMeta
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
		expires_at: string | null
		ended_at: string | null
		deleted_at: string | null
		user: SurveyUser
	}
}

export default SurveyType
