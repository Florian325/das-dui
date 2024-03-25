import { Card, H4, Image, ListItem, Separator, View, YGroup } from "tamagui"
import { StyleSheet, useWindowDimensions } from "react-native"
import { RenderHTMLSource } from "react-native-render-html"
import { openBrowserAsync } from "expo-web-browser"
import NewsType from "@/api/types/NewsTypes"

const NewsListContent = ({ content }: { content: string }) => {
	const { width } = useWindowDimensions()
	const source = {
		html: `${content}`,
	}
	return <RenderHTMLSource contentWidth={width} source={source} />
}

const styles = StyleSheet.create({
	image: {
		height: 200,
		resizeMode: "contain",
	},
})

const NewsListItem = ({ item }: { item: NewsType }) => {
	return (
		<Card marginVertical="$2" elevation={5}>
			{item.title || item.preview ? (
				<Card.Header>
					{item.title && <H4 lineHeight={"$3"}>{item.title}</H4>}
					{item.preview && (
						<Image
							source={{
								uri: item.preview.meta.uri,
							}}
							// height={200}
							// resizeMode="contain"
							style={styles.image}
						/>
					)}
				</Card.Header>
			) : (
				<></>
			)}
			<View style={{ paddingHorizontal: 20 }}>
				<NewsListContent content={item.content_rendered} />
			</View>

			{
				// .filter((val) => !["png", "jpg", "jpeg", "bmp"].includes(val.extension))
				item.attachments.length > 0 && (
					<Card.Footer style={{ padding: 20 }}>
						<YGroup
							bordered
							width={"100%"}
							size="$5"
							separator={<Separator />}
						>
							{item.attachments
								// .filter((val) => val.type == "application/pdf")
								.map((item, index) => (
									<YGroup.Item key={index}>
										<ListItem
											hoverTheme
											pressTheme
											title={item.name}
											subTitle={item.type}
											onPress={async () =>
												await openBrowserAsync(
													item.meta.uri
												)
											}
										/>
									</YGroup.Item>
								))}
						</YGroup>
					</Card.Footer>
				)
			}

			{/* <Text>{item.content}</Text> */}
		</Card>
	)
}

export default NewsListItem
