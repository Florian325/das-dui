import { useMemo } from "react"

const useTimeDifferenceHeight = (
	{ startTime, endTime }: { startTime: Date; endTime: Date },
	factor: number = 10
): number =>
	useMemo(
		() =>
			Math.round(
				(endTime.getTime() - startTime.getTime()) / (factor * 60 * 60)
			),
		[startTime, endTime]
	)

export default useTimeDifferenceHeight
