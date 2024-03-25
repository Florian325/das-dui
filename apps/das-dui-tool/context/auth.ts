import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { atomWithStorage, createJSONStorage } from "jotai/utils"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SecureStore from "expo-secure-store"

const isAuthStorage = createJSONStorage<boolean>(() => AsyncStorage)
const isAuthenticatedAtom = atomWithStorage<boolean>(
	"is-authenticated",
	false,
	isAuthStorage
)

export const useIsAuthenticated = () => useAtom(isAuthenticatedAtom)
export const useSetIsAuthenticated = () => useSetAtom(isAuthenticatedAtom)
export const useGetIsAuthenticated = () => useAtomValue(isAuthenticatedAtom)

// const authTokenAtom = atom<string | null>(null)
const authTokenInitailValue = SecureStore.getItem("auth-token") ?? ""
const authTokenAtom = atomWithStorage("auth-token", authTokenInitailValue, {
	getItem: async (key: string, initialValue: string) => {
		const value = await SecureStore.getItemAsync(key)
		return value ?? initialValue
	},
	setItem: async (key: string, value: string) => {
		await SecureStore.setItemAsync(key, value)
	},
	removeItem: async (key: string) => {
		await SecureStore.deleteItemAsync(key)
	},
})

export const useAuthToken = () => useAtom(authTokenAtom)
export const useSetAuthToken = () => useSetAtom(authTokenAtom)
export const useGetAuthToken = () => useAtomValue(authTokenAtom)
