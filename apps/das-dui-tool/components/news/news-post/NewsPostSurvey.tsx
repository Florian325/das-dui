import { FC, useEffect, useState } from "react"

import { FontAwesome } from "@expo/vector-icons"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
	Button,
	H5,
	H6,
	ListItem,
	Separator,
	Spinner,
	Text,
	View,
	XStack,
	YStack,
	useTheme,
} from "tamagui"

import { SurveyResponse, SurveyVoteRequest } from "@das-dui/api-client"

import GenericIcon from "@/components/ui/GenericIcon"
import useApiClient from "@/hooks/useApiClient"

interface NewsPostSurveyProps {
	survey?: SurveyResponse.Survey
}

const NewsPostSurvey: FC<NewsPostSurveyProps> = ({ survey }) => {
	return <>{survey && <SurveySection survey={survey} />}</>
}

interface SurveySectionProps {
	survey: SurveyResponse.Survey
}
const SurveySection: FC<SurveySectionProps> = ({ survey }) => {
	const theme = useTheme()
	const queryClient = useQueryClient()
	const client = useApiClient()

	useEffect(() => {
		queryClient.setQueryData<SurveyResponse.Survey>(
			["survey", survey.uuid],
			survey
		)
	}, [])

	const { data, isFetching } = useQuery({
		queryKey: ["survey", survey.uuid],
		queryFn: async () =>
			await client
				.getSurveyById({ surveyId: survey.uuid })
				.then((res) => res.data.data),
	})
	const { mutate, isPending, isError } = useMutation({
		mutationFn: async (vote: SurveyVoteRequest.Vote) => {
			return await client.postSurveyVote({ surveyId: survey.uuid }, vote)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["survey", survey.uuid] })
		},
	})

	const [selectedOptions, setSelectedOptions] = useState<
		SurveyVoteRequest.Vote["options"]
	>(
		data?.meta.options
			.filter((option) => option.is_chosen)
			.map((option) => option.uuid) ?? []
	)

	const onOptionPress = (uuid: string) => {
		if (data?.can.vote === 1 && !data?.meta.is_user_voted)
			if (data?.is_multi_answerable) {
				if (selectedOptions.includes(uuid)) {
					setSelectedOptions(
						selectedOptions.filter((uuid) => uuid !== uuid)
					)
				} else {
					setSelectedOptions([...selectedOptions, uuid])
				}
			} else {
				setSelectedOptions([uuid])
			}
	}

	return (
		<View>
			<Separator />
			<YStack p="$4" gap="$2">
				<XStack gap="$2" alignItems="center">
					<GenericIcon name="commenting" size={30} />
					<H5>Survey</H5>
					<Text fontStyle="italic">
						(
						{data?.is_multi_answerable
							? "Multiple Answer"
							: "Single Answer"}
						)
					</Text>
				</XStack>
				<H6>{data?.question}</H6>
				<YStack gap="$1">
					{data?.meta.options.map((option) => (
						<ListItem
							key={option.uuid}
							title={option.name}
							onPress={() => {
								onOptionPress(option.uuid)
							}}
							hoverTheme
							bordered
							pressTheme
							borderRadius="$4"
							{...(selectedOptions.includes(option.uuid) && {
								iconAfter: (
									<FontAwesome
										name="check-circle"
										size={20}
										color={theme.green10.val}
									/>
								),
							})}
						></ListItem>
					))}
				</YStack>
				{data?.can.vote === 1 &&
					!data.meta.is_over &&
					!data?.meta.is_user_voted && (
						<Button
							onPress={() => mutate({ options: selectedOptions })}
							disabled={isFetching || isPending}
							theme={"green"}
						>
							{isFetching || isPending ? (
								<Spinner />
							) : (
								"Submit Vote"
							)}
						</Button>
					)}
				<YStack gap="$2">
					{isError && <Text theme={"red_alt1"}>Submit Error</Text>}
					{data?.can.vote === 0 && !data.meta.is_over && (
						<Text theme={"red_alt1"}>No permission to vote</Text>
					)}
					{data?.meta.is_over && (
						<Text theme={"red_alt1"}>Survey is over</Text>
					)}
					{data?.meta.is_user_voted && (
						<Text theme={"green_alt1"}>Voted!</Text>
					)}
				</YStack>
			</YStack>
		</View>
	)
}

export default NewsPostSurvey
