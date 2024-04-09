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

	const timetableData = useMemo(() => {
		const td: { [key: string]: TimetableResponse.Lesson[] } = {}
		data.lessons.forEach((item) =>
			td[item.meta.displayname_hour]
				? td[item.meta.displayname_hour].push(item)
				: (td[item.meta.displayname_hour] = [item])
		)
		return td
	}, [data])

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
