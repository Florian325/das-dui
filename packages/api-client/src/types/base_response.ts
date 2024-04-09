export interface BaseResponseMeta {
	warnings: string[]
	errors: string[]
	success: string[]
}

export interface BaseResponse<data> {
	data: data
	status: string
	meta: BaseResponseMeta
}
