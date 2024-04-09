import FontAwesome from "@expo/vector-icons/FontAwesome"
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Slot } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"

import { TamaguiProvider, Theme, useTheme } from "tamagui"

import appConfig from "../tamagui.config"
import { Platform, useColorScheme } from "react-native"
import {
	RenderHTMLConfigProvider,
	TRenderEngineProvider,
} from "react-native-render-html"
import * as ScreenOrientation from "expo-screen-orientation"
import * as NavigationBar from "expo-navigation-bar"

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(auth)",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
		InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
		...FontAwesome.font,
	})

	ScreenOrientation.unlockAsync()

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error
	}, [error])

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return <RootLayoutProvider />
}

function RootLayoutProvider() {
	const colorScheme = useColorScheme()

	return (
		<TamaguiProvider
			config={appConfig}
			defaultTheme={colorScheme === "dark" ? "dark" : "light"}
		>
			<ThemeProvider
				value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
			>
				<Theme name={"blue_surface3"}>
					<RootLayoutNav />
				</Theme>
			</ThemeProvider>
		</TamaguiProvider>
	)
}

function RootLayoutNav() {
	const theme = useTheme()
	const colorScheme = useColorScheme()

	useEffect(() => {
		if (Platform.OS === "android") {
			NavigationBar.setBackgroundColorAsync(theme.background.val)
			NavigationBar.setButtonStyleAsync(
				colorScheme === "dark" ? "light" : "dark"
			)
		}
	}, [theme.background.val, colorScheme])

	return (
		<TRenderEngineProvider
			systemFonts={["Inter", "InterBold"]}
			baseStyle={{
				color: theme.color.val,
			}}
			tagsStyles={{
				a: { color: theme.colorFocus.val },
			}}
		>
			<RenderHTMLConfigProvider>
				<Slot />
			</RenderHTMLConfigProvider>
		</TRenderEngineProvider>
	)
}
