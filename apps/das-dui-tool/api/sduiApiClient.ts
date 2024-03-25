import SduiBaseResponse from "@/types/SduiBaseResponse"
import axios, { AxiosInstance } from "axios"
import NewsType from "./types/NewsTypes"
import TimetableTimeType from "./types/TimesType"
import TimeTableTypes from "./types/TimetableTypes"
import SelfUser from "./types/SelfType"
import ClassbookEntryData from "./types/ClassbookEntryType"

class SduiApiClient {
	private instance: AxiosInstance

	constructor(instance?: AxiosInstance) {
		this.instance = instance || axios
	}

	public getNews = async (page: number) => {
		const res = await this.instance.get<SduiBaseResponse<NewsType[]>>(
			"users/self/feed/news",
			{
				params: { page: page },
			}
		)
		return res.data
	}

	public getTimes = async () => {
		const res =
			await this.instance.get<SduiBaseResponse<TimetableTimeType[]>>(
				"timetables/times"
			)
		res?.data.data[0].type === "BREAK" && res?.data.data.splice(0, 1)

		return res?.data.data.filter((time) => time.is_hidden === false)
	}

	public getTimetable = async (
		{ from, to }: { from: Date | string; to: Date | string },
		offset?: number
	) => {
		const fromValue =
			from instanceof Date ? from.toISOString().substring(0, 10) : from
		const toValue =
			to instanceof Date ? to.toISOString().substring(0, 10) : to

		const res = await this.instance.get<SduiBaseResponse<TimeTableTypes>>(
			"timetables/users/self/timetable",
			{
				params: {
					begins_at: fromValue,
					ends_at: toValue,
					offset: offset,
				},
			}
		)

		return res.data
	}

	public getTimetableByUserId = async (
		userId: number,
		{ from, to }: { from: Date | string; to: Date | string },
		offset?: number
	) => {
		const fromValue =
			from instanceof Date ? from.toISOString().substring(0, 10) : from
		const toValue =
			to instanceof Date ? to.toISOString().substring(0, 10) : to

		const res = await this.instance.get<SduiBaseResponse<TimeTableTypes>>(
			`timetables/users/${userId}/timetable`,
			{
				params: {
					begins_at: fromValue,
					ends_at: toValue,
					offset: offset,
				},
			}
		)

		return res.data
	}

	public getSelf = async () => {
		const res =
			await this.instance.get<SduiBaseResponse<SelfUser>>("users/self")
		return res.data.data
	}

	public getClassbookEntry = async (
		lessonId: number,
		{ date }: { date: Date | string }
	) => {
		const dateValue =
			date instanceof Date ? date.toISOString().substring(0, 10) : date

		const resp = await this.instance.get<
			SduiBaseResponse<ClassbookEntryData>
		>(`timetables/lessons/${lessonId}/classbook-entry`, {
			params: {
				date: dateValue,
			},
		})
		return resp.data.data
	}
}

export default SduiApiClient
