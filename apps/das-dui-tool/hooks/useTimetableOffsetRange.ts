const useTimetableOffsetRange = (offset: number) => {
	const today = new Date()

	const offsetDate = new Date(today)

	offsetDate.setDate(today.getDate() + offset)
	today.setDate(today.getDate() - offset)

	return { today, offsetDate }
}

export default useTimetableOffsetRange
