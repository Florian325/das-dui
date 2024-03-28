import { FC } from "react"
import { useWindowDimensions } from "react-native"
import { RenderHTMLSource } from "react-native-render-html"

interface NewsPostContent {
	content: string
}

const NewsPostContent: FC<NewsPostContent> = ({ content }) => {
	const { width } = useWindowDimensions()
	const source = {
		html: `${content}`,
	}
	return <RenderHTMLSource contentWidth={width} source={source} />
}

export default NewsPostContent
