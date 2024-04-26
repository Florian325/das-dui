import { FC } from "react"
import { TouchableOpacity } from "react-native"

import * as WebBrowser from "expo-web-browser"

import { ListItem, useTheme } from "tamagui"

import { ChatMessagesResponse, CloudResponse } from "@das-dui/api-client"

import GenericIcon from "@/components/ui/GenericIcon"
import { iconNameBasedOnFileExtension } from "@/utils/iconNameBasedOnFileExtension"

type FileListItemProps = Pick<
	CloudResponse.CloudFile | ChatMessagesResponse.File,
	"name" | "meta" | "file_type" | "extension"
>

const FileListItem: FC<FileListItemProps> = ({
	name,
	meta,
	extension,
	file_type,
}) => {
	const theme = useTheme()

	return (
		<ListItem
			title={name}
			subTitle={meta.subtitle}
			icon={
				<GenericIcon
					name={
						file_type === "DIR"
							? meta.files_count > 0
								? "folder"
								: "folder-open"
							: iconNameBasedOnFileExtension(extension)
					}
					size={30}
					color={theme.color10.val}
				/>
			}
			iconAfter={
				<TouchableOpacity
					onPress={() =>
						WebBrowser.openBrowserAsync(meta.download_uri)
					}
				>
					<GenericIcon name="download" color={theme.color9.val} />
				</TouchableOpacity>
			}
			bordered
			pressTheme
			hoverTheme
			br={"$4"}
			my="$2"
		/>
	)
}

FileListItem.displayName = "FileListItem"

export default FileListItem
