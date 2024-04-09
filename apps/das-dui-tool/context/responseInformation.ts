import { atom, useAtom, useAtomValue, useSetAtom } from "jotai"

import { BaseResponseMeta } from "@das-dui/api-client"

const responseInformation = atom<BaseResponseMeta>({
	warnings: [],
	errors: [],
	success: [],
})

export const useResponseInformation = () => useAtom(responseInformation)
export const useGetResponseInformation = () => useAtomValue(responseInformation)
export const useSetResponseInformation = () => useSetAtom(responseInformation)
