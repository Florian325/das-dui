type SduiMetaObject = {
	warnings: string[]
	errors: string[]
	success: string[]
}

type SduiBaseResponse<data> = {
	data: data
	status: string
	meta: SduiMetaObject
}

export default SduiBaseResponse
export type { SduiMetaObject }
