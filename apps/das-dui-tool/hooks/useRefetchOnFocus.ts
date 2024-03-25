import { useFocusEffect } from "expo-router"
import { useCallback, useRef } from "react"

export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
	const firstTimeRef = useRef(true)

	useFocusEffect(
		useCallback(() => {
			if (firstTimeRef.current) {
				firstTimeRef.current = false
				return
			}

			refetch()
		}, [refetch])
	)
}
