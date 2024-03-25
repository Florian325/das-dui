import { ReactNode } from "react"
import { StyleSheet } from "react-native"
import { View } from "tamagui"

interface TimetableTopBarContainerProps {
	children?: ReactNode
}

const TimetableTopBarContainer = ({
	children,
}: TimetableTopBarContainerProps) => {
	return (
		<View
			style={styles.container}
			theme={"alt1"}
			borderColor={"$placeholderColor"}
		>
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 60,
		borderBottomWidth: 1.5,
	},
})
export default TimetableTopBarContainer
