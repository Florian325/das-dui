import { AxiosApiClient } from "@das-dui/api-client"

import useAxiosInstance from "@/hooks/useAxiosInstance"

const useApiClient = () => {
	const instance = useAxiosInstance()
	const client = new AxiosApiClient({
		authLogic: "external",
		instance: instance,
	})
	return client
}

export default useApiClient
