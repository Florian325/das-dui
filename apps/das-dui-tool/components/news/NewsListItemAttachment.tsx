import { NewsResponse } from "@das-dui/api-client"
import { openBrowserAsync } from "expo-web-browser"
import { FC } from "react"
import { Card, ListItem, Separator, YGroup } from "tamagui"

type NewsListItemAttachmentsProps = Pick<NewsResponse.News, "attachments">

const NewsListItemAttachments: FC<NewsListItemAttachmentsProps> = ({
	attachments,
}) => {
	return (
		<>
			{attachments.length > 0 && (
				<Card.Footer style={{ padding: 20 }}>
					<YGroup
						bordered
						width={"100%"}
						size="$5"
						separator={<Separator />}
					>
						{attachments.map((item) => (
							<YGroup.Item key={item.id}>
								<ListItem
									hoverTheme
									pressTheme
									title={item.name}
									subTitle={item.type}
									onPress={async () =>
										await openBrowserAsync(item.meta.uri)
									}
								/>
							</YGroup.Item>
						))}
					</YGroup>
				</Card.Footer>
			)}
		</>
	)
}

export default NewsListItemAttachments
