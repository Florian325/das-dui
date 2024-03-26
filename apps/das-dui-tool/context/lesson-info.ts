import { TimetableResponse } from "@das-dui/api-client"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { atomWithStorage, createJSONStorage } from "jotai/utils"

const lessonInfoStorage = createJSONStorage<TimetableResponse.Lesson | null>(
	() => AsyncStorage
)
const lessonInfo = atomWithStorage<TimetableResponse.Lesson | null>(
	"lesson-info",
	null,
	lessonInfoStorage,
	{ getOnInit: true }
)

// const lessonInfo = atomWithStorage<Lesson | null>(null)
export const useLessonInfo = () => useAtom(lessonInfo)
export const useSetLessonInfo = () => useSetAtom(lessonInfo)
export const useGetLessonInfo = () => useAtomValue(lessonInfo)
