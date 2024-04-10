import { FC, useMemo } from "react"

import { useQueryClient } from "@tanstack/react-query"

import { TimetableResponse, TimetableTimeResponse } from "@das-dui/api-client"

import TimetableBlockItem from "@/components/timetable/TimetableBlockItem"

interface TimetableGridProps {
	data: TimetableResponse.Timetable
}

const TimetableGrid: FC<TimetableGridProps> = ({ data }) => {
	const queryClient = useQueryClient()

	const timetableTimeStructure = queryClient.getQueryData<
		TimetableTimeResponse.TimetableTime[] | null
	>(["timetableTimes"])

	const timetableData = useMemo(
		() =>
			data.lessons.reduce(
				(x, y) => {
					;(x[y.meta.displayname_hour] =
						x[y.meta.displayname_hour] || []).push(y)

					return x
				},
				{} as { [key: string]: TimetableResponse.Lesson[] }
			),
		[data.last_updated_at]
	)

	return (
		<>
			{timetableTimeStructure?.map((time, i) => (
				<TimetableBlockItem
					key={i}
					item={time}
					lessons={timetableData[time.meta.displayname]}
				/>
			))}
		</>
	)
}

export default TimetableGrid
