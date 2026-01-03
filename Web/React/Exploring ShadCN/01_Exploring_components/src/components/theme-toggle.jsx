import { Button } from "@/components/ui/button"
import { useTheme } from "@/providers/theme-provider"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === "dark" ? "🌙" : "☀️"}
    </Button>
  )
}
