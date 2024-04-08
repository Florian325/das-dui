import { FC } from "react"
import { useWindowDimensions } from "react-native"
import { RenderHTMLSource } from "react-native-render-html"

interface RenderHTMLGenericProps {
	content: string
}

const RenderHTMLGeneric: FC<RenderHTMLGenericProps> = ({ content }) => {
	const { width } = useWindowDimensions()
	const source = {
		html: `${content}`,
	}
	return <RenderHTMLSource contentWidth={width} source={source} />
}

export default RenderHTMLGeneric
