/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: "FragmentMono_400Regular",
        subtitle: "FragmentMono_400Regular_Italic",
        body: "FragmentMono_400Regular_Italic",
        bold: "FragmentMono_400Regular",
      },
    },
  },
  plugins: [],
};
