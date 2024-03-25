import SduiApiClient from "@/api/sduiApiClient"
import useAxiosInstance from "./useAxiosInstance"

const useSduiApiClient = () => {
	const instance = useAxiosInstance()
	const client = new SduiApiClient(instance)
	return client
}

export default useSduiApiClient
