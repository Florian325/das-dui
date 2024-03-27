import { Card } from "tamagui"
import { NewsResponse } from "@das-dui/api-client"
import { FC, memo } from "react"
import NewsListItemHeader from "./NewsListItemHeader"
import NewsListItemBody from "./NewsListItemBody"
import NewsListItemAttachments from "./NewsListItemAttachment"

interface NewsListItemProps {
	item: NewsResponse.News
}

const NewsListItem: FC<NewsListItemProps> = ({ item }) => {
	return (
		<Card marginVertical="$2" elevation={5}>
			<NewsListItemHeader title={item.title} preview={item.preview} />
			<NewsListItemBody content_rendered={item.content_rendered} />
			<NewsListItemAttachments attachments={item.attachments} />
		</Card>
	)
}

export default memo(NewsListItem, (prevProps, nextProps) => {
	return (
		prevProps.item.id === nextProps.item.id &&
		prevProps.item.updated_at === nextProps.item.updated_at
	)
})
