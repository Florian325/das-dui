import { FC, PropsWithChildren } from "react"

import { Link } from "expo-router"

import { CloudResponse } from "@das-dui/api-client"

type FileLinkProps = Pick<
	CloudResponse.CloudFile,
	"uuid" | "cloud_id" | "path" | "name" | "file_type"
>

const FileLink: FC<PropsWithChildren<FileLinkProps>> = ({
	children,
	cloud_id,
	file_type,
	name,
	path,
	uuid,
}) => {
	const params = new URLSearchParams({
		name: name,
	})
	const nameParam = params
		.toString()
		.split("&")[0]
		.split("=")[1]
		.replaceAll("+", " ")

	return (
		<Link
			push
			href={
				file_type === "DIR"
					? {
							pathname: "/(auth)/(app)/chats/cloud/file/[fileId]",
							params: {
								fileId: uuid,
								cloudId: cloud_id,
								path: path,
							},
						}
					: {
							pathname:
								"/(auth)/(app)/chats/cloud/open_file/[fileId]",
							params: {
								fileId: uuid,
								cloudId: cloud_id,
								name: nameParam,
							},
						}
			}
			asChild
		>
			{children}
		</Link>
	)
}

FileLink.displayName = "FileLink"

export default FileLink
