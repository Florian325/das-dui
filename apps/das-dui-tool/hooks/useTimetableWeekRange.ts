const useTimetableWeekRange = (offset: number) => {
	const currentDate = new Date()
	const currentDay = currentDate.getDay() // 0 is Sunday, 1 is Monday, ..., 6 is Saturday

	// Calculate the difference between the current day and Monday (1)
	const differenceToMonday = currentDay - 1
	const differenceToFriday = currentDay - 5

	const monday = new Date(currentDate)
	const friday = new Date(currentDate)

	monday.setDate(currentDate.getDate() - differenceToMonday + 7 * offset)
	// monday.setHours(0, 0, 0, 0)

	friday.setDate(currentDate.getDate() - differenceToFriday + 7 * offset)
	// friday.setHours(0, 0, 0, 0)

	return { monday, friday }
}

export default useTimetableWeekRange
