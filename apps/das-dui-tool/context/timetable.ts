/* eslint-disable @typescript-eslint/no-explicit-any */
import TimetableTimeType from "@/api/types/TimesType"
import TimeTableTypes from "@/api/types/TimetableTypes"
import SduiBaseResponse from "@/types/SduiBaseResponse"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { InfiniteData } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { atomWithStorage, createJSONStorage } from "jotai/utils"

const timetableTimeStructureStorage = createJSONStorage<
	TimetableTimeType[] | null
>(() => AsyncStorage)
const timetableTimeStructure = atomWithStorage<TimetableTimeType[] | null>(
	"timetable-time-structure",
	null,
	timetableTimeStructureStorage,
	{ getOnInit: true }
)
export const useTimetableTimeStructure = () => useAtom(timetableTimeStructure)
export const useSetTimetableTimeStructure = () =>
	useSetAtom(timetableTimeStructure)
export const useGetTimetableTimeStructure = () =>
	useAtomValue(timetableTimeStructure)

const timetableDataStorage = createJSONStorage<
	| InfiniteData<
			AxiosResponse<SduiBaseResponse<TimeTableTypes>, any>,
			unknown
	  >
	| undefined
>(() => AsyncStorage)
const timetableData = atomWithStorage<
	| InfiniteData<
			AxiosResponse<SduiBaseResponse<TimeTableTypes>, any>,
			unknown
	  >
	| undefined
>("timetable-data", { pages: [], pageParams: [] }, timetableDataStorage, {
	getOnInit: true,
})

export const useTimetableData = () => useAtom(timetableData)
export const useSetTimetableData = () => useSetAtom(timetableData)
export const useGetTimetableData = () => useAtomValue(timetableData)
