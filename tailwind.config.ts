import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0c1d36',
        pink: '#d4628b',
        cream: '#faf8f5',
      },
    },
  },
  plugins: [],
}
export default config
