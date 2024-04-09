import AsyncStorage from "@react-native-async-storage/async-storage"

import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { atomWithStorage, createJSONStorage } from "jotai/utils"

import { TimetableResponse } from "@das-dui/api-client"

const lessonInfoStorage = createJSONStorage<TimetableResponse.Lesson | null>(
	() => AsyncStorage
)
const lessonInfo = atomWithStorage<TimetableResponse.Lesson | null>(
	"lesson-info",
	null,
	lessonInfoStorage,
	{ getOnInit: true }
)

export const useLessonInfo = () => useAtom(lessonInfo)
export const useSetLessonInfo = () => useSetAtom(lessonInfo)
export const useGetLessonInfo = () => useAtomValue(lessonInfo)
