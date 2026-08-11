/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        ember: "#d76000",
        emberDark: "#b74d00",
        clay: "#bf6d2b",
        cream: "#fffaf3",
        paper: "#fff7ed",
        ink: "#2a201d",
      },
          brand: {
    DEFAULT: '#E8600A',
    light:   '#FF8533',
    pale:    '#FFF4EC',
    dark:    '#B84C00',
  },
  surface: '#FFFAF6',
  border:  '#F0E0D0',
  muted:   '#7A6A58',
  ink:     '#1A1208',
  badge: {
    green:      '#1BA94C',
    'green-bg': '#E7F8EE',   // ← add
    yellow:     '#E8A00A',
    'yellow-bg':'#FEF4E0',   // ← add
    orange:     '#E8600A',
    'orange-bg':'#FFF0E6',   // ← add
  },
       fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body:    ['Nunito', 'Trebuchet MS', 'sans-serif'],
          sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"],
      },

      boxShadow: {
        recipe: "0 26px 80px rgba(70, 35, 5, .18)",
        soft: "0 10px 28px rgba(161, 85, 12, .10)",
        card:    '0 12px 40px rgba(232,96,10,.14)',
        btn:     '0 6px 20px rgba(232,96,10,.30)',
        chip:    '0 4px 14px rgba(232,96,10,.30)',
                search:  '0 0 0 3px rgba(232,96,10,.12)',

      },
       borderRadius: {
        chip: '9999px',
        card: '18px',
      },

      

      keyframes: {
        sheetIn: {
          "0%": { opacity: "0", transform: "translateY(34px) scale(.985)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(215, 96, 0, .22)" },
          "50%": { boxShadow: "0 0 0 10px rgba(215, 96, 0, 0)" },
        },
          slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        popIn: {
          '0%':   { opacity: '0', transform: 'scale(.7)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        heroIn: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      animation: {
        sheetIn: "sheetIn .75s cubic-bezier(.22, 1, .36, 1) both",
        rise: "rise .65s cubic-bezier(.22, 1, .36, 1) both",
        pulseSoft: "pulseSoft 2.4s ease-in-out infinite",
          slideDown:  'slideDown .5s ease both',
        fadeUp:     'fadeUp .5s ease both',
        fadeUp1:    'fadeUp .5s .10s ease both',
        fadeUp2:    'fadeUp .5s .22s ease both',
        fadeUp3:    'fadeUp .5s .34s ease both',
        fadeUp4:    'fadeUp .5s .40s ease both',
        popIn0:     'popIn .35s .05s cubic-bezier(.34,1.56,.64,1) both',
        popIn1:     'popIn .35s .10s cubic-bezier(.34,1.56,.64,1) both',
        popIn2:     'popIn .35s .15s cubic-bezier(.34,1.56,.64,1) both',
        popIn3:     'popIn .35s .20s cubic-bezier(.34,1.56,.64,1) both',
        popIn4:     'popIn .35s .25s cubic-bezier(.34,1.56,.64,1) both',
        popIn5:     'popIn .35s .30s cubic-bezier(.34,1.56,.64,1) both',
        heroText:   'heroIn .6s .10s ease both',
        heroImg:    'heroIn .7s .25s ease both',
      
      },
    },
  },

  plugins: [],
};

export default config;
