import { useQuery, useQueryClient } from "@tanstack/react-query"

import { BaseResponse, UserResponse } from "@das-dui/api-client"

import { useGetSelectedUserId } from "@/context/userId"
import useApiClient from "@/hooks/useApiClient"
import { getTeachersStats } from "@/lib/getTeachersStats"

export const useTeachersStatsQuery = () => {
	const client = useApiClient()
	const queryClient = useQueryClient()

	const userId = useGetSelectedUserId()
	const userData = queryClient.getQueryData<BaseResponse<UserResponse.User>>([
		"self",
		{ userId: userId },
	])

	const fromDate =
		userData?.data.school.timetable.schoolyears
			.at(0)
			?.begins_at.substring(0, 10) ??
		new Date().toUTCString().substring(0, 10)
	const toDate = new Date().toISOString().substring(0, 10)

	const timetableResponse = client
		.getTimetableByDate(
			{
				from: fromDate,
				to: toDate,
			},
			userId
		)
		.then((res) => res.data.data.lessons)

	const query = useQuery({
		queryKey: ["stats", { userId: userId }, { fromDate, toDate }],
		queryFn: () => getTeachersStats(timetableResponse),
		staleTime: 1000,
		gcTime: 1000,
	})

	return query
}
