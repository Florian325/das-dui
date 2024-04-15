import axios, { AxiosInstance } from "axios"

import {
	BaseResponse,
	ChatMemberResponse,
	ChatMessagesResponse,
	ChatsResponse,
	ClassbookEntryResponse,
	CloudResponse,
	LeadsResponse,
	LoginResponse,
	NewsResponse,
	SurveyResponse,
	SurveyVoteRequest,
	TimetableResponse,
	TimetableTimeResponse,
	UserActivitySummaryResponse,
	UserResponse,
} from "../types"

/**
 * Parameters for the AxiosApiClient class.
 * Can be either for internal or external authentication logic.
 */
type AxiosApiClientParams =
	| {
			authLogic: "internal"
			token?: string
			instance?: AxiosInstance
	  }
	| {
			authLogic: "external"
			instance?: AxiosInstance
	  }

/**
 * AxiosApiClient class for making API requests to the sdui api.
 */
class AxiosApiClient {
	private instance: AxiosInstance
	private token: string
	private authLogic: "internal" | "external"

	constructor(params: AxiosApiClientParams) {
		this.instance =
			params.instance ||
			axios.create({
				baseURL: "https://api.sdui.app/v1/",
				timeout: 100000,
			})
		this.token = params.authLogic === "internal" ? params.token || "" : ""
		this.authLogic = params.authLogic

		this.instance.interceptors.request.use((config) => {
			if (this.authLogic === "internal") {
				config.headers.Authorization = `Bearer ${this.token}`
			}
			return config
		})
	}

	public getInstance = (): AxiosInstance => this.instance

	public setToken = (token: string) => {
		this.token = token
	}

	public getToken = (): string => this.token

	public login = async ({
		slink,
		identifier,
		password,
		showErrors = true,
	}: {
		slink: string
		identifier: string
		password: string
		showErrors?: boolean
	}) => {
		const response = await this.instance.post<
			BaseResponse<LoginResponse.LoginToken>
		>("auth/login", {
			slink,
			identifier,
			password,
			showErrors,
		})
		this.setToken(response.data.data.access_token)

		return response
	}

	public getLeadsByName = async ({
		searchQuery,
	}: {
		searchQuery: string
	}) => {
		const response = await this.instance.get<
			BaseResponse<LeadsResponse.Lead[]>
		>("leads", {
			params: { search: searchQuery },
		})
		return response
	}

	public getNewsByPage = async (
		{
			page,
		}: {
			page: number
		},
		userId: number | string = "self"
	) => {
		const response = await this.instance.get<
			BaseResponse<NewsResponse.News[]>
		>(`users/${userId}/feed/news`, {
			params: { page: page },
		})
		return response
	}

	public getNewsById = async ({ newsId }: { newsId: number }) => {
		const response = await this.instance.get<
			BaseResponse<NewsResponse.News>
		>(`channels/news/${newsId}`)
		return response
	}

	private _getTimes = async () =>
		await this.instance.get<
			BaseResponse<TimetableTimeResponse.TimetableTime[]>
		>("timetables/times")

	public getTimes = async () => {
		const response = await this._getTimes()
		return response.data.data
	}

	public getTimesCleanedUp = async () => {
		const response = await this._getTimes()

		response.data.data[0].type === "BREAK" &&
			response.data.data.splice(0, 1)
		return response.data.data.filter((time) => !time.is_hidden)
	}

	public getTimetableByDate = async (
		{
			from,
			to,
		}: {
			from: Date | string
			to: Date | string
		},
		userId: number | string = "self"
	) => {
		const fromValue =
			from instanceof Date ? from.toISOString().substring(0, 10) : from
		const toValue =
			to instanceof Date ? to.toISOString().substring(0, 10) : to

		const response = await this.instance.get<
			BaseResponse<TimetableResponse.Timetable>
		>(`timetables/users/${userId}/timetable`, {
			params: {
				begins_at: fromValue,
				ends_at: toValue,
			},
		})

		return response
	}

	public getUser = async (userId: number | string = "self") => {
		const response = await this.instance.get<
			BaseResponse<UserResponse.User>
		>(`users/${userId}`)
		return response
	}

	public getUserActivitySummary = async (
		userId: number | string = "self"
	) => {
		const response = await this.instance.get<
			BaseResponse<UserActivitySummaryResponse.ActivitySummary>
		>(`users/${userId}/activity-summary`)
		return response
	}

	public getClassbookEntry = async ({
		lessonId,
		date,
	}: {
		lessonId: number
		date: Date | string
	}) => {
		const dateValue =
			date instanceof Date ? date.toISOString().substring(0, 10) : date

		const response = await this.instance.get<
			BaseResponse<ClassbookEntryResponse.ClassbookEntry>
		>(`timetables/lessons/${lessonId}/classbook-entry`, {
			params: {
				date: dateValue,
			},
		})
		return response
	}

	public getSurveyById = async ({ surveyId }: { surveyId: string }) => {
		const response = await this.instance.get<
			BaseResponse<SurveyResponse.Survey>
		>(`channels/surveys/${surveyId}`)
		return response
	}

	public postSurveyVote = async (
		{ surveyId }: { surveyId: string },
		vote: SurveyVoteRequest.Vote
	) => {
		const response = await this.instance.put<
			BaseResponse<SurveyResponse.Survey>,
			SurveyVoteRequest.Vote
		>(`channels/surveys/${surveyId}/vote`, vote)
		return response
	}

	public getChats = async (
		{
			page,
			search = "",
			limit = 10,
		}: {
			page: number
			search?: string
			limit?: number
		},
		userId: number | string = "self"
	) => {
		const response = await this.instance.get<
			BaseResponse<ChatsResponse.Chats[]>
		>(`users/${userId}/channels/chats`, {
			params: {
				page,
				search,
				limit,
			},
		})
		return response
	}

	getChatMessageById = async ({
		chatId,
		messageId,
	}: {
		chatId: number
		messageId: string
	}) => {
		const response = await this.instance.get<
			BaseResponse<ChatMessagesResponse.ChatMessage>
		>(`channels/chats/${chatId}/messages/${messageId}`)
		return response
	}

	getChatMessagesByPage = async ({
		chatId,
		page,
	}: {
		chatId: number
		page: number
	}) => {
		const response = await this.instance.get<
			BaseResponse<ChatMessagesResponse.ChatMessage[]>
		>(`channels/chats/${chatId}/messages`, {
			params: { page: page },
		})
		return response
	}

	postChatMessage = async ({
		chatId,
		message,
		file,
	}: {
		chatId: number
		message: string
		file?: File
	}) => {
		const response = await this.instance.post<
			BaseResponse<ChatMessagesResponse.ChatMessage>
		>(`channels/chats/${chatId}/messages`, {
			message,
			file,
		})
		return response
	}

	getChatMemers = async ({
		chatId,
		page = 1,
		search = "",
	}: {
		chatId: number
		page?: number
		search?: string
	}) => {
		const response = await this.instance.get<
			BaseResponse<ChatMemberResponse.Member[]>
		>(`channels/${chatId}/users`, {
			params: { page, search },
		})
		return response
	}

	getCloudFiles = async ({
		cloudId,
		file,
		path,
		orderBy = "name",
		orderDir = "asc",
		fileType,
		limit = 12,
		page,
		search,
	}: {
		cloudId: number
		file?: string
		path?: string
		orderBy?: string
		orderDir?: string
		fileType?: string
		limit?: number
		page?: number
		search?: string
	}) => {
		const response = await this.instance.get<
			BaseResponse<CloudResponse.CloudFile[]>
		>(`channels/cloud/${cloudId}/files`, {
			params: {
				file,
				path,
				"order-by": orderBy,
				"order-dir": orderDir,
				"file-type": fileType,
				limit,
				page,
				search,
			},
		})
		return response
	}

	getCloudFileById = async ({
		cloudId,
		fileId,
	}: {
		cloudId: number
		fileId: string
	}) => {
		console.log("getCloudFileById", cloudId, fileId)
		const response = await this.instance.get<
			BaseResponse<CloudResponse.CloudFile>
		>(`channels/cloud/${cloudId}/files/${fileId}`)
		return response
	}
}

export { AxiosApiClient }
