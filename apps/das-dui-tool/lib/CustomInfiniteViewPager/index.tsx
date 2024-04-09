// Inspired by https://github.com/computerjazz/react-native-infinite-pager/blob/main/src/index.tsx
import React, { ReactNode, memo, useRef, useState } from "react"
import PagerView, { PagerViewProps } from "react-native-pager-view"

import { View } from "tamagui"

import { useStableCallback } from "@/lib/CustomInfiniteViewPager/useStableCallback"

export type InfinitePagerPageProps = {
	index: number
}

export type InfinitePagerPageComponent = (
	props: InfinitePagerPageProps
) => JSX.Element | ReactNode | null

export type InfinitePagerProps = {
	PageComponent:
		| InfinitePagerPageComponent
		| React.MemoExoticComponent<InfinitePagerPageComponent>
	onPageChange?: (page: number) => void
	pageBuffer?: number // number of pages to render on either side of active page
	newPageThreshold?: number
	initialPage?: number
	pagerViewProps?: Omit<PagerViewProps, "initialPage" | "onPageSelected">
}

const CustomInfinitePager = ({
	PageComponent,
	onPageChange,
	pageBuffer = 2,
	newPageThreshold = 1,
	initialPage = 0,
	pagerViewProps,
}: InfinitePagerProps) => {
	const [curIndex, setCurIndex] = useState<number>(pageBuffer + initialPage)

	const DEFAULT_PAGE_COUNT = pageBuffer * 2 + 1
	const [pageIndices, setPageIndicies] = useState(
		[...Array(DEFAULT_PAGE_COUNT)].map((_, i) => {
			const bufferIndex = i - pageBuffer
			// console.log(bufferIndex)
			return bufferIndex
		})
	)

	const [pageScrollState, setPageScrollState] = useState<
		"idle" | "dragging" | "settling"
	>("idle")

	const onPageChangeInternal = useStableCallback((pg: number) => {
		// console.log("Current Index", pg)
		if (pg <= newPageThreshold) {
			setPageIndicies((prev) => [prev[0] - 1, ...prev])
		} else if (pg >= pageIndices.length - 1 - newPageThreshold) {
			setPageIndicies((prev) => [...prev, prev[prev.length - 1] + 1])
		}
		setCurIndex(pg)
		onPageChange?.(pg)
	})

	const ref = useRef<PagerView | null>(null)
	// console.log(pageIndices.length)

	const isInitialState = () => {
		if (
			pageIndices.length == DEFAULT_PAGE_COUNT &&
			pageScrollState === "idle"
		) {
			const zeroIndex = pageIndices.indexOf(0)
			// console.log("Zero Index", zeroIndex + initialPage)
			ref.current?.setPageWithoutAnimation(zeroIndex + initialPage)
			return true
		}
		return false
	}
	isInitialState()

	return (
		<PagerView
			{...pagerViewProps}
			style={{ flex: 1 }}
			initialPage={curIndex}
			ref={ref}
			onPageScrollStateChanged={(e) => {
				// console.log(e.nativeEvent.pageScrollState)
				setPageScrollState(e.nativeEvent.pageScrollState)
			}}
			onPageSelected={(e) => {
				const initialState = isInitialState()
				if (initialState) {
					return
				}
				onPageChangeInternal(e.nativeEvent.position)
			}}
		>
			{pageIndices.map((pageIndex) => {
				return (
					<View key={`pageItem-${pageIndex}`}>
						<PageComponent
							key={`pageItem-comp-${pageIndex}`}
							index={pageIndex}
						/>
					</View>
				)
			})}
		</PagerView>
	)
}

export default memo(CustomInfinitePager)
