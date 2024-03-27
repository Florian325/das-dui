import { useQueryClient } from "@tanstack/react-query"
import { FC, useMemo } from "react"
import TimetableBlockItem from "./TimetableBlockItem"
import { TimetableResponse, TimetableTimeResponse } from "@das-dui/api-client"

interface TimetableGridProps {
	data: TimetableResponse.Timetable
}

const TimetableGrid: FC<TimetableGridProps> = ({ data }) => {
	const queryClient = useQueryClient()

	const timetableTimeStructure = queryClient.getQueryData<
		TimetableTimeResponse.TimetableTime[] | null
	>(["times"])

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
