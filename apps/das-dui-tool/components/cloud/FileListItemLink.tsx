import { FC } from "react"
import { TouchableOpacity } from "react-native"

import * as WebBrowser from "expo-web-browser"

import { ListItem, useTheme } from "tamagui"

import { ChatMessagesResponse, CloudResponse } from "@das-dui/api-client"

import FileLink from "@/components/cloud/FileLink"
import GenericIcon from "@/components/ui/GenericIcon"
import { iconNameBasedOnFileExtension } from "@/utils/iconNameBasedOnFileExtension"

type FileListItemLinkProps = Pick<
	CloudResponse.CloudFile | ChatMessagesResponse.File,
	"uuid" | "cloud_id" | "path" | "name" | "file_type" | "meta" | "extension"
>
const FileListItemLink: FC<FileListItemLinkProps> = ({
	cloud_id,
	file_type,
	name,
	path,
	uuid,
	meta,
	extension,
}) => {
	const theme = useTheme()
	return (
		<FileLink
			cloud_id={cloud_id}
			file_type={file_type}
			name={name}
			path={path}
			uuid={uuid}
		>
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
		</FileLink>
	)
}

export default FileListItemLink
