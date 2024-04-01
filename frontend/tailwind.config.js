/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                main: "#f7c50f",
                "main-light": "#f5ce40",
                "main-blue": "#1C4980",
                "main-blue-light": "#2f609b",
            },

            fontFamily: {
                poppins: ["Poppins"],
            },
            maxWidth: {
                maxContent: "1260px",
                screen: "100vw",
            },
        },
    },

    plugins: [nextui()],
    darkMode: "class",
};
