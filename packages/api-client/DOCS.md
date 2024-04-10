# API Reference - @das-dui/api-client

## Overview

The `@das-dui/api-client` package provides a convenient way to interact with the Sdui API. It abstracts away the complexities of making HTTP requests and handling authentication, allowing you to focus on building your application.

Below is the API reference for the `AxiosApiClient` class:

## Class: AxiosApiClient

### Constructor

```typescript
constructor(params: AxiosApiClientParams)
```

-   Creates an instance of the AxiosApiClient class.
-   Parameters:
    -   `params`: Parameters for initializing the AxiosApiClient instance. It can be either for internal or external authentication logic.
        -   `authLogic`: Authentication logic, can be `"internal"` or `"external"`.
        -   `token?`: (Optional) Token for internal authentication logic.
        -   `instance?`: (Optional) AxiosInstance for custom configurations.

#### Methods

##### `getInstance`

```typescript
public getInstance(): AxiosInstance
```

-   Returns the AxiosInstance associated with the AxiosApiClient instance.

##### `setToken`

```typescript
public setToken(token: string): void
```

-   Sets the authentication token for internal authentication logic.
-   Parameters:
    -   `token`: Authentication token.

##### `getToken`

```typescript
public getToken(): string
```

-   Returns the current authentication token.

##### `login`

```typescript
public login({
  slink,
  identifier,
  password,
  showErrors
}: {
  slink: string,
  identifier: string,
  password: string,
  showErrors?: boolean
}): Promise<AxiosResponse<BaseResponse<LoginResponse.LoginToken>>>
```

-   Logs in a user and retrieves an access token.
-   Parameters:
    -   `slink`: School link.
    -   `identifier`: User identifier.
    -   `password`: User password.
    -   `showErrors`: (Optional) Boolean to indicate whether to show errors in the response.
-   Returns: A Promise resolving to the AxiosResponse containing the login token.

##### `getLeadsByName`

```typescript
public getLeadsByName({
  searchQuery
}: {
  searchQuery: string
}): Promise<AxiosResponse<BaseResponse<LeadsResponse.Lead[]>>>
```

-   Retrieves leads by name.
-   Parameters:
    -   `searchQuery`: Search query for leads.
-   Returns: A Promise resolving to the AxiosResponse containing the leads.

##### `getNewsByPage`

```typescript
public getNewsByPage({
  page
}: {
  page: number
}, userId?: number | string): Promise<AxiosResponse<BaseResponse<NewsResponse.News[]>>>
```

-   Retrieves news by page.
-   Parameters:
    -   `page`: Page number.
    -   `userId`: (Optional) User ID.
-   Returns: A Promise resolving to the AxiosResponse containing the news.

##### `getNewsById`

```typescript
public getNewsById({
  newsId
}: {
  newsId: number
}): Promise<AxiosResponse<BaseResponse<NewsResponse.News>>>
```

-   Retrieves news post by id.
-   Parameters:
    -   `newsId`: News Id.
-   Returns: A Promise resolving to the AxiosResponse containing the news.

##### `getTimes`

```typescript
public getTimes(): Promise<TimetableTimeResponse.TimetableTime[]>
```

-   Retrieves timetable times.
-   Returns: A Promise resolving to an array of timetable times.

##### `getTimesCleanedUp`

```typescript
public getTimesCleanedUp(): Promise<TimetableTimeResponse.TimetableTime[]>
```

-   Retrieves cleaned up timetable times (removes hidden times and the first break if present).
-   Returns: A Promise resolving to an array of cleaned up timetable times.

##### `getTimetableByDate`

```typescript
public getTimetableByDate({
  from,
  to
}: {
  from: Date | string,
  to: Date | string
}, userId?: number | string): Promise<AxiosResponse<BaseResponse<TimetableResponse.Timetable>>>
```

-   Retrieves timetable for a specific date range.
-   Parameters:
    -   `from`: Start date.
    -   `to`: End date.
    -   `userId`: (Optional) User ID.
-   Returns: A Promise resolving to the AxiosResponse containing the timetable.

##### `getUser`

```typescript
public getUser(userId?: number | string): Promise<AxiosResponse<BaseResponse<UserResponse.User>>>
```

-   Retrieves user information.
-   Parameters:
    -   `userId`: (Optional) User ID.
-   Returns: A Promise resolving to the AxiosResponse containing the user information.

##### `getUserActivitySummary`

```typescript
public getUserActivitySummary(userId?: number | string): Promise<AxiosResponse<BaseResponse<UserActivitySummaryResponse.ActivitySummary>>>
```

-   Retrieves user activity summary.
-   Parameters:
    -   `userId`: (Optional) User ID.
-   Returns: A Promise resolving to the AxiosResponse containing the user activity summary.

##### `getClassbookEntry`

```typescript
public getClassbookEntry({
  lessonId,
  date
}: {
  lessonId: number,
  date: Date | string
}): Promise<AxiosResponse<BaseResponse<ClassbookEntryResponse.ClassbookEntry>>>
```

-   Retrieves classbook entry for a lesson on a specific date.
-   Parameters:
    -   `lessonId`: Lesson ID.
    -   `date`: Date of the classbook entry.
-   Returns: A Promise resolving to the classbook entry.

##### `getSurveyById`

```typescript
public getSurveyById({
  surveyId
}: {
  surveyId: string
}): Promise<AxiosResponse<BaseResponse<SurveyResponse.Survey>>>
```

-   Retrieves survey by id.
-   Parameters:
    -   `surveyId`: Survey Id.
-   Returns: A Promise resolving to the AxiosResponse containing the survey.

##### `postSurveyVote`

```typescript
public postSurveyVote(
  { surveyId }: { surveyId: string },
  vote: SurveyVoteRequest.Vote
): Promise<AxiosResponse<BaseResponse<SurveyResponse.Survey>>>
```

-   Posts a vote to a survey.
-   Parameters:
    -   `surveyId`: Survey Id.
    -   `vote`: Vote object.
-   Returns: A Promise resolving to the AxiosResponse containing the updated survey.

Here are the updated class methods added to the documentation:

##### `getChats`

```typescript
public getChats(
  {
    page,
    search = "",
    limit = 10,
  }: {
    page: number
    search?: string
    limit?: number
  },
  userId: number | string = "self"
): Promise<AxiosResponse<BaseResponse<ChatsResponse.Chats[]>>>
```

-   Retrieves chats by page.
-   Parameters:
    -   `page`: Page number.
    -   `search`: (Optional) Search query.
    -   `limit`: (Optional) Limit of chats per page.
    -   `userId`: (Optional) User ID.
-   Returns: A Promise resolving to the AxiosResponse containing the chats.

##### `getChatMessagesByPage`

```typescript
public getChatMessagesByPage(
  {
    chatId,
    page,
  }: {
    chatId: number
    page: number
  }
): Promise<AxiosResponse<BaseResponse<ChatMessagesResponse.ChatMessage[]>>>
```

-   Retrieves chat messages by page.
-   Parameters:
    -   `chatId`: Chat ID.
    -   `page`: Page number.
-   Returns: A Promise resolving to the AxiosResponse containing the chat messages.

##### `getChatMemers`

```typescript
public getChatMemers(
  {
    chatId,
    page = 1,
    search = "",
  }: {
    chatId: number
    page?: number
    search?: string
  }
): Promise<AxiosResponse<BaseResponse<ChatMemberResponse.Member[]>>>
```

-   Retrieves chat members.
-   Parameters:
    -   `chatId`: Chat ID.
    -   `page`: (Optional) Page number.
    -   `search`: (Optional) Search query.
-   Returns: A Promise resolving to the AxiosResponse containing the chat members.

##### `getCloudFiles`

```typescript
public getCloudFiles(
  {
    cloudId,
    file,
    path,
    orderBy = "name",
    orderDir = "asc",
    fileType,
    limit = 12,
    page,
    search,
  }: {
    cloudId: number
    file?: string
    path?: string
    orderBy?: string
    orderDir?: string
    fileType?: string
    limit?: number
    page?: number
    search?: string
  }
): Promise<AxiosResponse<BaseResponse<CloudResponse.CloudFile[]>>>
```

-   Retrieves cloud files.
-   Parameters:
    -   `cloudId`: Cloud ID.
    -   `file`: (Optional) File name.
    -   `path`: (Optional) File path.
    -   `orderBy`: (Optional) Order by criteria (default is "name").
    -   `orderDir`: (Optional) Order direction (default is "asc").
    -   `fileType`: (Optional) File type.
    -   `limit`: (Optional) Limit of files per page (default is 12).
    -   `page`: (Optional) Page number.
    -   `search`: (Optional) Search query.
-   Returns: A Promise resolving to the AxiosResponse containing the cloud files.

##### `getCloudFileById`

```typescript
public getCloudFileById(
  {
    cloudId,
    fileId,
  }: {
    cloudId: number
    fileId: string
  }
): Promise<AxiosResponse<BaseResponse<CloudResponse.CloudFile>>>
```

-   Retrieves a cloud file by ID.
-   Parameters:
    -   `cloudId`: Cloud ID.
    -   `fileId`: File ID.
-   Returns: A Promise resolving to the AxiosResponse containing the cloud file.

## Important Types

```typescript
/**
 * Represents a response from an Axios request.
 * @template T The type of data contained in the response.
 * @template D The type of data associated with the request.
 */
export interface AxiosResponse<T = any, D = any> {
	/** The data returned by the server. */
	data: T
	/** The HTTP status code of the response. */
	status: number
	/** The status message corresponding to the status code. */
	statusText: string
	/** The headers sent by the server. */
	headers: RawAxiosResponseHeaders | AxiosResponseHeaders
	/** The Axios request config. */
	config: InternalAxiosRequestConfig<D>
	/** The XMLHttpRequest instance or a browser-specific equivalent (optional). */
	request?: any
}

/**
 * Represents metadata associated with a base response.
 */
interface BaseResponseMeta {
	/** An array of warning messages. */
	warnings: string[]
	/** An array of error messages. */
	errors: string[]
	/** An array of success messages. */
	success: string[]
}

/**
 * Represents a base response from an API request.
 * @template T The type of data contained in the response.
 */
export interface BaseResponse<T> {
	/** The data contained in the response. */
	data: T
	/** The status of the response. */
	status: string
	/** The metadata associated with the response. */
	meta: BaseResponseMeta
}
```

---
