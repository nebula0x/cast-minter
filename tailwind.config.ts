import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: 'hsl(var(--secondary))',
                accent: 'hsl(var(--accent))',
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: '#9ca3af',
                },
                border: 'hsl(var(--border))',
            },
            borderRadius: {
                DEFAULT: 'var(--radius)',
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'zoom-in-95': {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
            animation: {
                'in': 'fade-in 0.2s ease-out',
                'zoom-in-95': 'zoom-in-95 0.2s ease-out',
            },
        },
    },
    plugins: [],
} satisfies Config;
