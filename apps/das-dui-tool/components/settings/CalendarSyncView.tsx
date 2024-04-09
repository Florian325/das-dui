import { useState } from "react"

import * as Calendar from "expo-calendar"

import { Button, ListItem, Spinner } from "tamagui"

import useApiClient from "@/hooks/useApiClient"
import useTimetableOffsetRange from "@/hooks/useTimetableOffsetRange"

const CalendarSyncView = () => {
	// const [calendarPermission, setCalendarPermission] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const getCalendarPermission = async () => {
		const { status, granted } =
			await Calendar.requestCalendarPermissionsAsync()
		console.log(status, granted)
		return granted
	}
	// useEffect(() => {
	// 	getCalendarPermission().then(granted => {
	// 		setCalendarPermission(granted)
	// 	})
	// }, [])

	const client = useApiClient()
	const { today, offsetDate } = useTimetableOffsetRange(100)

	const syncEvents = async () => {
		const granted = await getCalendarPermission()
		if (!granted) {
			console.log("Calendar permission not granted")
			return
		}
		setIsLoading(true)
		const defaultCalendarSource = {
			isLocalAccount: true,
			name: "BetterSduiClientCalendar",
			id: "betterSduiCalendar__2",
			type: "local",
		}
		if (
			!(await Calendar.getCalendarsAsync()).find(
				(value) => value.title === defaultCalendarSource.name
			)
		)
			await Calendar.createCalendarAsync({
				title: defaultCalendarSource.name,
				color: "green",
				entityType: Calendar.EntityTypes.EVENT,
				sourceId: defaultCalendarSource.id,
				source: defaultCalendarSource,
				name: defaultCalendarSource.name,
				ownerAccount: "personal",
				accessLevel: Calendar.CalendarAccessLevel.OWNER,
			})
		const currentCalendar = (await Calendar.getCalendarsAsync()).find(
			(value) => value.title === defaultCalendarSource.name
		)

		console.log(currentCalendar?.id)
		console.log(
			"Syncing events",
			today.toISOString().substring(0, 10),
			offsetDate.toISOString().substring(0, 10)
		)
		const data = await client
			.getTimetableByDate({ from: today, to: offsetDate })
			.then((res) => res.data)
		const events = data.data.lessons.filter(
			(lesson) => lesson.kind == "EVENT"
		)
		//console.log(events)
		// const c = await Calendar.createEventAsync(String(currentCalendar?.id), {
		// 	title: "1",
		// 	startDate: new Date(),
		// 	endDate: new Date(),
		// 	timeZone: "Europe/Berlin",
		// })
		// console.log(c)
		events.forEach(async (event) => {
			console.log("loop")
			const startDate = new Date(0)
			startDate.setSeconds(event.begins_at)
			const endDate = new Date(0)
			endDate.setSeconds(event.ends_at)
			console.log("loop", startDate.toUTCString(), endDate.toUTCString())
			console.log("E")
			console.log("e", await Calendar.getEventAsync(String(event.id)))
			// if (!eventItem) {
			// const c = await Calendar.createEventAsync(
			// 	String(currentCalendar?.id),
			// 	{
			// 		title: `${event.meta.displayname} - ${event.course.meta.displayname}`,
			// 		startDate: startDate,
			// 		endDate: endDate,
			// 		timeZone: "Europe/Berlin",
			// 		notes: event.comment,
			// 	}
			// )
			// console.log(c)
			// }
			console.log("loop")
		})
		// console.log(data)
		console.log("Synced events")
		setIsLoading(false)
	}

	const onSyncButtonPress = () => {
		console.log("Syncing calendar")
		syncEvents()
	}
	return (
		<ListItem
			bordered
			radiused
			title="Calendar Sync"
			subTitle="Sync timetable events with your calendar"
		>
			<Button onPress={onSyncButtonPress}>
				{isLoading ? <Spinner /> : "Sync"}
				Sync
			</Button>
		</ListItem>
	)
}

export default CalendarSyncView
