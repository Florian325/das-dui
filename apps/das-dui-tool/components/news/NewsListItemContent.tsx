import { FC } from "react"
import { useWindowDimensions } from "react-native"
import { RenderHTMLSource } from "react-native-render-html"

interface NewsListItemContent {
	content: string
}

const NewsListItemContent: FC<NewsListItemContent> = ({ content }) => {
	const { width } = useWindowDimensions()
	const source = {
		html: `${content}`,
	}
	return <RenderHTMLSource contentWidth={width} source={source} />
}

export default NewsListItemContent
