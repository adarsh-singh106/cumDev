// React utilities we need
// - createContext: to create a global store
// - useContext: to read from that store
// - useEffect: to run code when app loads
// - useState: to store current theme
import { createContext, useContext, useEffect, useState } from "react"


// Create a context (global storage for theme data)
// At this moment, it is empty
const ThemeContext = createContext()


// ThemeProvider wraps the entire app
// Any component inside it can access theme data
export function ThemeProvider({ children }) {

  // React state to store current theme
  // Default is "light" until we decide otherwise
  const [theme, setTheme] = useState("light")


  // This effect runs ONCE when the app starts
  // Its job: decide which theme to apply initially
  useEffect(() => {

    // Try to read previously saved theme from browser storage
    const storedTheme = localStorage.getItem("theme")

    if (storedTheme) {
      // If user has chosen a theme before:
      // 1. Update React state
      setTheme(storedTheme)

      // 2. Add or remove `.dark` class on <html>
      //    This activates shadcn + Tailwind dark styles
      document.documentElement.classList.toggle(
        "dark",
        storedTheme === "dark"
      )
    } else {
      // If no saved theme exists:
      // Check user's system (OS) theme preference
      const systemPrefersDark =
        window.matchMedia("(prefers-color-scheme: dark)").matches

      // Apply system theme as default
      setTheme(systemPrefersDark ? "dark" : "light")

      // Sync `.dark` class with system preference
      document.documentElement.classList.toggle(
        "dark",
        systemPrefersDark
      )
    }
  }, []) // Empty dependency array = run only once on mount


  // Function called when user clicks the toggle button
  const toggleTheme = () => {

    // Decide the next theme
    // If current is dark → switch to light
    // If current is light → switch to dark
    const nextTheme = theme === "dark" ? "light" : "dark"

    // Update React state (for UI updates)
    setTheme(nextTheme)

    // Add or remove `.dark` class on <html>
    // This instantly switches CSS variables
    document.documentElement.classList.toggle(
      "dark",
      nextTheme === "dark"
    )

    // Save user's choice so it persists after refresh
    localStorage.setItem("theme", nextTheme)
  }


  // Provide theme data & toggle function to entire app
  return (
    <ThemeContext.Provider
      value={{
        theme,        // current theme ("light" or "dark")
        toggleTheme,  // function to switch theme
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}


// Custom hook for easier usage
// Instead of useContext(ThemeContext)
// We can simply call useTheme()
export const useTheme = () => useContext(ThemeContext)
