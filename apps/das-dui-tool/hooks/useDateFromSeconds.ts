import { useMemo } from "react"

const useDateFromSeconds = (seconds: number): Date =>
	useMemo(() => {
		const date = new Date(0)
		date.setSeconds(seconds)
		return date
	}, [seconds])

export default useDateFromSeconds
