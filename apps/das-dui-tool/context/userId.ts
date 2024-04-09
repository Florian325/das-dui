import AsyncStorage from "@react-native-async-storage/async-storage"

import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { atomWithStorage, createJSONStorage } from "jotai/utils"

const userIdStorage = createJSONStorage<number>(() => AsyncStorage)
const userIdAtom = atomWithStorage<number>("user-id", 0, userIdStorage)

export const useUserId = () => useAtom(userIdAtom)
export const useSetUserId = () => useSetAtom(userIdAtom)
export const useGetUserId = () => useAtomValue(userIdAtom)

const selectedUserIdStorage = createJSONStorage<number>(() => AsyncStorage)
const selectedUserIdAtom = atomWithStorage<number>(
	"selected-user-id",
	0,
	selectedUserIdStorage
)

export const useSelectedUserId = () => useAtom(selectedUserIdAtom)
export const useSetSelectedUserId = () => useSetAtom(selectedUserIdAtom)
export const useGetSelectedUserId = () => useAtomValue(selectedUserIdAtom)
