import { SduiMetaObject } from "@/types/SduiBaseResponse"
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai"

const responseInformation = atom<SduiMetaObject>({
	warnings: [],
	errors: [],
	success: [],
})

export const useResponseInformation = () => useAtom(responseInformation)
export const useGetResponseInformation = () => useAtomValue(responseInformation)
export const useSetResponseInformation = () => useSetAtom(responseInformation)
