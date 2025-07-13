/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			zIndex: {
				smallest: "var(--z-index-smallest)",
				small: "var(--z-index-small)",
				medium: "var(--z-index-medium)",
				large: "var(--z-index-large)",
				largest: "var(--z-index-largest)"
			}
		}
	},
	plugins: []
};
