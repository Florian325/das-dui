import { View } from "tamagui"
import NewsListItemContent from "./NewsListItemContent"
import { NewsResponse } from "@das-dui/api-client"
import { FC } from "react"

type NewsListItemBodyProps = Pick<NewsResponse.News, "content_rendered">

const NewsListItemBody: FC<NewsListItemBodyProps> = ({ content_rendered }) => {
	return (
		<View style={{ paddingHorizontal: 20 }}>
			<NewsListItemContent content={content_rendered} />
		</View>
	)
}

export default NewsListItemBody
