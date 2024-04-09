import { Text, YStack } from "tamagui"

import { useGetResponseInformation } from "@/context/responseInformation"

const ResponseInformation = () => {
	const responseInformation = useGetResponseInformation()

	return (
		<YStack>
			{responseInformation.warnings.map((warning, index) => (
				<Text style={{ color: "yellow" }} key={index}>
					{warning}
				</Text>
			))}
			{responseInformation.errors.map((error, index) => (
				<Text style={{ color: "red" }} key={index}>
					{error}
				</Text>
			))}
			{responseInformation.success.map((success, index) => (
				<Text style={{ color: "green" }} key={index}>
					{success}
				</Text>
			))}
		</YStack>
	)
}

export default ResponseInformation
