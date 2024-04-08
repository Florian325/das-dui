const createPreviewFromText = (
	originalText: string,
	maxLength: number = 100
): string => {
	originalText.replaceAll("\n", "")
	originalText.replaceAll("\r", "")
	originalText.replaceAll("\r\n", "")
	if (originalText.length <= maxLength) {
		return originalText
	}
	const ellipsis = "..."
	const truncatedText = originalText.substring(0, maxLength - ellipsis.length)
	return truncatedText + ellipsis
}

export default createPreviewFromText
