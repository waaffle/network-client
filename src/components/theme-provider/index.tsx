import React, { ReactNode, createContext, useState } from "react"

type TypeTheme = {
  theme: "dark" | "light"
  toggleTheme: () => void
}

export const ThemeContext = createContext<TypeTheme>({
  theme: "dark",
  toggleTheme: () => null,
})

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const localTheme = localStorage.getItem("theme")
  const currentTheme = localTheme ? (localTheme as "light" | "dark") : "dark"

  const [theme, setTheme] = useState(currentTheme)

  const toggleTheme = () => {
    setTheme((prevTheme: "light" | "dark"): "light" | "dark" => {
      const newTheme = prevTheme === "dark" ? "light" : "dark"
      localStorage.setItem("theme", newTheme)
      return newTheme
    })
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className={`${theme} bg-background text-foreground`}>
        {children}
      </main>
    </ThemeContext.Provider>
  )
}
