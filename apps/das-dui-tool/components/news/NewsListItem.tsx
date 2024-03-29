import { NewsResponse } from "@das-dui/api-client"
import { FC, memo } from "react"
import NewsPostContainer from "./news-post/NewsPostContainer"
import NewsPostHeader from "./news-post/NewsPostHeader"
import NewsPostBody from "./news-post/NewsPostBody"
import NewsPostAttachments from "./news-post/NewsPostAttachments"
import NewsPostSurvey from "./news-post/NewsPostSurvey"

interface NewsListItemProps {
	item: NewsResponse.News
}

const NewsListItem: FC<NewsListItemProps> = ({ item }) => {
	return (
		<NewsPostContainer>
			<NewsPostHeader title={item.title} preview={item.preview} />
			<NewsPostBody content_rendered={item.content_rendered} />
			<NewsPostAttachments attachments={item.attachments} />
			<NewsPostSurvey survey={item.survey} />
		</NewsPostContainer>
	)
}

export default memo(NewsListItem, (prevProps, nextProps) => {
	return (
		prevProps.item.id === nextProps.item.id &&
		prevProps.item.updated_at === nextProps.item.updated_at
	)
})
