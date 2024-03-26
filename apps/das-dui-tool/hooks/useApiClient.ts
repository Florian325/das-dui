import useAxiosInstance from "./useAxiosInstance"
import { AxiosApiClient } from "@das-dui/api-client"

const useApiClient = () => {
	const instance = useAxiosInstance()
	const client = new AxiosApiClient({
		authLogic: "external",
		instance: instance,
	})
	return client
}

export default useApiClient
