import { useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import TimetableBlockItem from "./TimetableBlockItem"
import { TimetableResponse, TimetableTimeResponse } from "@das-dui/api-client"

function TimetableGrid({ data }: { data: TimetableResponse.Timetable }) {
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

// export default memo(TimetableGrid, (oldProps, newProps) => {
// 	// console.log(
// 	// 	"memo",
// 	// 	oldProps.data.lessons[0].id,
// 	// 	newProps.data.lessons[0].id
// 	// )
// 	// return oldProps.data.lessons === newProps.data.lessons
// 	return (
// 		oldProps.data.lessons[0].id === newProps.data.lessons[0].id &&
// 		oldProps.data.last_updated_at === newProps.data.last_updated_at
// 	)
// })
