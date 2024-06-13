import plugin from "tailwindcss/plugin"
import { greenTheme, amberTheme, blueTheme, orangeTheme, purpleTheme, redTheme, yellowTheme, zincTheme } from "./data"
export const shadcnplugin = plugin(function ({ addBase }, theme) {
    let selectedTheme
    switch (theme) {
        case "green":
            selectedTheme = greenTheme
            break
        case "amber":
            selectedTheme = amberTheme
            break
        case "blue":
            selectedTheme = blueTheme
            break
        case "orange":
            selectedTheme = orangeTheme
            break
        case "purple":
            selectedTheme = purpleTheme
            break
        case "red":
            selectedTheme = redTheme
            break
        case "yellow":
            selectedTheme = yellowTheme
            break
        case "zinc":
            selectedTheme = zincTheme
            break
        // Add cases for other themes as needed
        default:
            selectedTheme = purpleTheme // Default to green theme
            break
    }

    // Add the selected theme base styles
    addBase(purpleTheme)
})
