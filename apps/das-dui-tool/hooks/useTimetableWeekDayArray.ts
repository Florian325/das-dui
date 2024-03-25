const useTimetableWeekDayArray = (offset: number) => {
	const currentDate = new Date()
	const currentDay = currentDate.getDay()

	const startOfWeek = new Date(currentDate)
	startOfWeek.setDate(currentDate.getDate() - currentDay + 7 * offset)

	return new Array(5).fill(0).map((_, i) => {
		const date = new Date(startOfWeek)
		date.setDate(startOfWeek.getDate() + i + 1)
		return date
	})
}

export default useTimetableWeekDayArray
