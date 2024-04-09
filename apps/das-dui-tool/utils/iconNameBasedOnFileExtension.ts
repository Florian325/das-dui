import { ComponentProps } from "react"

import { FontAwesome } from "@expo/vector-icons"

export const iconNameBasedOnFileExtension = (
	extension?: string | null
): ComponentProps<typeof FontAwesome>["name"] => {
	switch (extension) {
		case "pdf":
			return "file-pdf-o"
		case "doc":
		case "docx":
		case "odt":
			return "file-word-o"
		case "xls":
		case "xlsx":
		case "ods":
			return "file-excel-o"
		case "ppt":
		case "pptx":
		case "odp":
			return "file-powerpoint-o"
		case "zip":
		case "tar":
		case "gz":
		case "bz2":
		case "xz":
		case "7z":
		case "rar":
		case "tgz":
			return "file-archive-o"
		case "jpg":
		case "jpeg":
		case "png":
		case "gif":
		case "bmp":
		case "webp":
		case "svg":
		case "ico":
			return "file-image-o"
		case "mp3":
		case "wav":
		case "flac":
		case "ogg":
		case "m4a":
		case "wma":
			return "file-audio-o"
		case "mp4":
		case "avi":
		case "mkv":
		case "mov":
		case "flv":
		case "wmv":
			return "file-video-o"
		case "txt":
		case "log":
		case "md":
		case "json":
		case "xml":
		case "html":
		case "css":
		case "js":
		case "ts":
		case "tsx":
		case "jsx":
		case "py":
		case "java":
		case "c":
		case "cpp":
		case "h":
		case "hpp":
		case "cs":
		case "sh":
		case "bat":
		case "ps1":
		case "psm1":
		case "psd1":
		case "ps1xml":
		case "psc1":
		case "pssc":
		case "vbs":
		case "vbe":
		case "jse":
		case "wsf":
		case "wsc":
		case "php":
		case "rb":
		case "pl":
		case "pm":
		case "cgi":
		case "lua":
		case "sql":
		case "r":
		case "rmd":
		case "cshtml":
		case "vb":
		case "asp":
		case "aspx":
		case "asax":
		case "ascx":
		case "master":
		case "sitemap":
		case "config":
			return "file-text-o"
		default:
			return "file"
	}
}
