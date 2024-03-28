import { FC } from "react"
import { Card, H4, Image } from "tamagui"
import { NewsResponse } from "@das-dui/api-client"
import { StyleSheet } from "react-native"

type NewsPostHeaderProps = Pick<NewsResponse.News, "title" | "preview">

const NewsPostHeader: FC<NewsPostHeaderProps> = ({ title, preview }) => {
	return (
		<>
			{(title || preview) && (
				<Card.Header>
					{title && <H4 lineHeight={"$3"}>{title}</H4>}
					{preview && (
						<Image
							source={{
								uri: preview.meta.uri,
							}}
							style={styles.image}
						/>
					)}
				</Card.Header>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	image: {
		height: 200,
		resizeMode: "contain",
		marginTop: 10,
	},
})

export default NewsPostHeader
