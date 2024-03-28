# @das-dui/api-client

Welcome to @das-dui/api-client! This package serves as a powerful API client for accessing the Sdui API. Built with simplicity and efficiency in mind, this client abstracts away the complexities of interacting with the Sdui API, making integration into your projects seamless.

## 🚨 Disclaimer

**This is a community project. Neither it nor the author is affiliated with Sdui GmBH.**

## 📋 Features

-   **Easy Authentication**: With support for both internal and external authentication logic, authentication becomes a breeze. Simply provide the necessary parameters, and the client takes care of the rest.

-   **Effortless Requests**: Perform various API requests with ease. Whether you need to retrieve user data, fetch news, or access the classbook, the client provides intuitive methods for making requests.

-   **Flexible Integration**: Seamlessly integrate Sdui's functionality into your applications. Whether you're developing extensions, customizations, or entirely new applications, this client simplifies the process.

## 🔧 Usage

```typescript
import { AxiosApiClient } from "@das-dui/api-client"

// Initialize the client with authentication parameters
const client = new AxiosApiClient({
	authLogic: "internal", // or "external"
	token: "YOUR_ACCESS_TOKEN", // Required for internal authentication logic, leave empty if you don't have a toke and then call the login function
})

// Example: Login and fetch news by page
const login = async (slink: string, identifier: string, password: string) => {
	// Login
	await client.login({ slink, identifier, password })
}

// Example: Fetch news by page
const fetchNews = async (page: number) => {
	const response = await client.getNewsByPage({ page })
	return response.data
}

// Example: Fetch user data
const fetchUserData = async (userId: number | string) => {
	const response = await client.getUser(userId)
	return response.data
}

// Use other methods similarly for different API endpoints
```

## 🚀 Getting Started

1. Install the package **(coming soon)**:

    ```bash
    npm install @das-dui/api-client
    ```

2. Import and initialize the client in your project.

3. Start making requests to the Sdui API effortlessly!

## 📚 Documentation

For detailed usage instructions and available methods, please refer to the [documentation](https://github.com/Florian325/das-dui/wiki/@das%E2%80%90dui-api%E2%80%90client).

## 💡 Contribution

Contributions are welcome! If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/Florian325/das-dui).

## 📝 License

This package is licensed under the [MIT License](https://github.com/Florian325/das-dui/blob/main/LICENSE). Feel free to use, modify, and distribute it as per the terms of the license.

---

Happy coding with @das-dui/api-client! If you have any questions or need assistance, don't hesitate to reach out.
