import { useEffect } from "react"

import { router } from "expo-router"

export default function IndexView() {
	useEffect(() => {
		router.replace("/(auth)/(app)/timetable")
	}, [])
	return <></>
}
