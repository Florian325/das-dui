import { View } from "tamagui"
import NewsPostContent from "./NewsPostContent"
import { NewsResponse } from "@das-dui/api-client"
import { FC } from "react"

type NewsPostBodyProps = Pick<NewsResponse.News, "content_rendered">

const NewsPostBody: FC<NewsPostBodyProps> = ({ content_rendered }) => {
	return (
		<View style={{ paddingHorizontal: 20 }}>
			<NewsPostContent content={content_rendered} />
		</View>
	)
}

export default NewsPostBody
