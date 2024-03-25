// import { config } from "@tamagui/config/v3"

// import { createTamagui } from "tamagui"
// export const tamaguiConfig = createTamagui(config)
// export default tamaguiConfig
// export type Conf = typeof tamaguiConfig
// declare module "tamagui" {
// 	interface TamaguiCustomConfig extends Conf {}
// }

import { config } from "@tamagui/config/v3"

import { createTamagui } from "tamagui" // or '@tamagui/core'
const appConfig = createTamagui(config)
export type AppConfig = typeof appConfig
declare module "tamagui" {
	// or '@tamagui/core'

	// overrides TamaguiCustomConfig so your custom types

	// work everywhere you import `tamagui`

	interface TamaguiCustomConfig extends AppConfig {
		name: "My App"
	}
}
export default appConfig
