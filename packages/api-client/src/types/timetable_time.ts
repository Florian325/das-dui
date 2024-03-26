interface TimetableTime {
	meta: {
		displayname: string
	}
	begins_at: number
	ends_at: number
	id: number
	hour: number
	type: "BREAK" | "LESSON"
	name: string
	description: null | string
	is_hidden: boolean
}

export type { TimetableTime }
