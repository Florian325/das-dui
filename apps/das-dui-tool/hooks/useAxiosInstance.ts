import { useAuthToken } from "@/context/auth"
import { useSetResponseInformation } from "@/context/responseInformation"
import SduiBaseResponse from "@/types/SduiBaseResponse"
import axios, { AxiosError, AxiosResponse } from "axios"

const useAxiosInstance = () => {
	const setResponseInformation = useSetResponseInformation()
	const [authToken] = useAuthToken()

	const instance = axios.create({
		baseURL: "https://api.sdui.app/v1/",
		headers: {
			Authorization: authToken ? `Bearer ${authToken}` : undefined,
		},
		timeout: 100000,
	})

	instance.interceptors.response.use(
		(response: AxiosResponse<SduiBaseResponse<unknown>>) => {
			setResponseInformation(response.data.meta)
			return response
		},
		(error: AxiosError) => {
			console.log("error")
			const originalResponse = error.response
				?.data as SduiBaseResponse<unknown>
			console.log(originalResponse)

			if (originalResponse?.meta)
				setResponseInformation(originalResponse.meta)
			return Promise.reject(error)
		}
	)

	return instance
}

export default useAxiosInstance
