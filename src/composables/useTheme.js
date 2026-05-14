// src/composables/useTheme.js
export function setGlobalTheme(theme) {
    const html = document.documentElement
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    localStorage.setItem('theme', theme)

    if (theme === 'dark') {
        html.classList.add('dark')
    } else if (theme === 'light') {
        html.classList.remove('dark')
    } else {
        if (isSystemDark) {
            html.classList.add('dark')
        } else {
            html.classList.remove('dark')
        }
    }
}