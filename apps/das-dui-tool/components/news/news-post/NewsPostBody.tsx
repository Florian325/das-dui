import { FC } from "react"

import { View } from "tamagui"

import { NewsResponse } from "@das-dui/api-client"

import NewsPostContent from "@/components/news/news-post/NewsPostContent"

type NewsPostBodyProps = Pick<NewsResponse.News, "content_rendered">

const NewsPostBody: FC<NewsPostBodyProps> = ({ content_rendered }) => {
	return (
		<View px="$4">
			<NewsPostContent content={content_rendered} />
		</View>
	)
}

export default NewsPostBody
