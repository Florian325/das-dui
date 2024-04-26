import { FC } from "react"
import { StyleSheet } from "react-native"

import { Image } from "tamagui"

import { ChatMessagesResponse } from "@das-dui/api-client"

import FileLink from "@/components/cloud/FileLink"
import FileListItemLink from "@/components/cloud/FileListItemLink"

interface ChatMessageFileProps {
	file: ChatMessagesResponse.File
}

const ChatMessageFile: FC<ChatMessageFileProps> = ({ file }) => {
	if (file.type?.startsWith("image")) {
		return (
			<FileLink
				cloud_id={file.cloud_id}
				file_type={file.file_type}
				name={file.name}
				path={file.path}
				uuid={file.uuid}
			>
				<Image
					source={{
						uri: file.meta.thumbnail_uri ?? file.meta.uri,
					}}
					style={styles.image}
				/>
			</FileLink>
		)
	} else
		return (
			<FileListItemLink
				cloud_id={file.cloud_id}
				extension={file.extension}
				file_type={file.file_type}
				meta={file.meta}
				name={file.name}
				path={file.path}
				uuid={file.uuid}
			/>
		)
}

const styles = StyleSheet.create({
	image: {
		width: 200,
		height: 150,
		resizeMode: "contain",
	},
})

export default ChatMessageFile
