import { useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import TimetableBlockItem from "./TimetableBlockItem"
import TimetableTimeType from "@/api/types/TimesType"
import TimeTableTypes, { Lesson } from "@/api/types/TimetableTypes"

function TimetableGrid({ data }: { data: TimeTableTypes }) {
	const queryClient = useQueryClient()

	const timetableTimeStructure = queryClient.getQueryData<
		TimetableTimeType[] | null
	>(["times"])

	const timetableData = useMemo(() => {
		const td: { [key: string]: Lesson[] } = {}
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
