interface BaseResponseMeta {
	warnings: string[]
	errors: string[]
	success: string[]
}

interface BaseResponse<data> {
	data: data
	status: string
	meta: BaseResponseMeta
}

export type { BaseResponse, BaseResponseMeta }
