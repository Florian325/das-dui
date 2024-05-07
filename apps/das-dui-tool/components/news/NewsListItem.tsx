import { FC, memo } from "react"

import { NewsResponse } from "@das-dui/api-client"

import NewsPostAttachments from "@/components/news/news-post/NewsPostAttachments"
import NewsPostBody from "@/components/news/news-post/NewsPostBody"
import NewsPostContainer from "@/components/news/news-post/NewsPostContainer"
import NewsPostHeader from "@/components/news/news-post/NewsPostHeader"
import NewsPostSurvey from "@/components/news/news-post/NewsPostSurvey"

interface NewsListItemProps {
	item: NewsResponse.News
	withoutMemo?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NewsListItem: FC<NewsListItemProps> = ({ item, withoutMemo = false }) => {
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
	if (nextProps.withoutMemo || prevProps.withoutMemo) {
		return false
	}
	if (
		!prevProps.item.attachments.length ||
		!nextProps.item.attachments.length
	) {
		return false
	}

	const attachmentsChanged = Boolean(
		prevProps.item.attachments.filter(
			(a, index) =>
				a.meta.download_uri ===
					nextProps.item.attachments[index].meta.download_uri &&
				a.meta.temp_uri ===
					nextProps.item.attachments[index].meta.temp_uri &&
				a.meta.uri === nextProps.item.attachments[index].meta.uri
		).length !== prevProps.item.attachments.length
	)

	return (
		prevProps.item.id === nextProps.item.id &&
		prevProps.item.updated_at === nextProps.item.updated_at &&
		!attachmentsChanged
	)
})
