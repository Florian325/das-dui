export interface Course {
	id: number
	name: string | null
	description: string | null
	subject_id: number
	meta: {
		displayname: string
	}
}
