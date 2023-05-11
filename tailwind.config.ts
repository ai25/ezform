import { type Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            aspectRatio: {
                phone: "9/16",
                tablet: "3/4",
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
} satisfies Config;
