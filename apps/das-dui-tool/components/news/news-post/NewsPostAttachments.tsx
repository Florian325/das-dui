import { FC } from "react"

import { openBrowserAsync } from "expo-web-browser"

import { Card, ListItem, Separator, YGroup } from "tamagui"

import { NewsResponse } from "@das-dui/api-client"

type NewsPostAttachmentsProps = Pick<NewsResponse.News, "attachments">

const NewsPostAttachments: FC<NewsPostAttachmentsProps> = ({ attachments }) => {
	return (
		<>
			{attachments.length > 0 && (
				<Card.Footer px="$4" py="$3">
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

export default NewsPostAttachments
