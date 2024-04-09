/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncStorage from "@react-native-async-storage/async-storage"

import { InfiniteData } from "@tanstack/react-query"

import { AxiosResponse } from "axios"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { atomWithStorage, createJSONStorage } from "jotai/utils"

import {
	BaseResponse,
	TimetableResponse,
	TimetableTimeResponse,
} from "@das-dui/api-client"

const timetableTimeStructureStorage = createJSONStorage<
	TimetableTimeResponse.TimetableTime[] | null
>(() => AsyncStorage)
const timetableTimeStructure = atomWithStorage<
	TimetableTimeResponse.TimetableTime[] | null
>("timetable-time-structure", null, timetableTimeStructureStorage, {
	getOnInit: true,
})
export const useTimetableTimeStructure = () => useAtom(timetableTimeStructure)
export const useSetTimetableTimeStructure = () =>
	useSetAtom(timetableTimeStructure)
export const useGetTimetableTimeStructure = () =>
	useAtomValue(timetableTimeStructure)

const timetableDataStorage = createJSONStorage<
	| InfiniteData<
			AxiosResponse<BaseResponse<TimetableResponse.Timetable>, any>,
			unknown
	  >
	| undefined
>(() => AsyncStorage)
const timetableData = atomWithStorage<
	| InfiniteData<
			AxiosResponse<BaseResponse<TimetableResponse.Timetable>, any>,
			unknown
	  >
	| undefined
>("timetable-data", { pages: [], pageParams: [] }, timetableDataStorage, {
	getOnInit: true,
})

export const useTimetableData = () => useAtom(timetableData)
export const useSetTimetableData = () => useSetAtom(timetableData)
export const useGetTimetableData = () => useAtomValue(timetableData)
