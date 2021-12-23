module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'primary': ['Poppins', 'sans-serif'],
    },
    extend: {
      colors:{
        'secondary': '#C7E4E5',
        'tertiary': '#293241',
        'line':'#3D5A80',
        'highlight': '#5FADDA',
      },
    },
  },
  plugins: [],
}
