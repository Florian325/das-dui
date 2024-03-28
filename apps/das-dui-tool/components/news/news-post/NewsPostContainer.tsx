import { Card } from "tamagui"
import { FC, ReactNode } from "react"

interface NewsPostContainerProps {
	children: ReactNode
}

const NewsPostContainer: FC<NewsPostContainerProps> = ({ children }) => {
	return (
		<Card marginVertical="$2" elevation={5}>
			{children}
		</Card>
	)
}

export default NewsPostContainer
