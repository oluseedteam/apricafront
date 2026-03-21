/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans:    ['"Instrument Sans"', 'sans-serif'],
        serif:   ['"Instrument Serif"', 'serif'],
      },
      colors: {
        cream:    '#FAF7F2',
        cream2:   '#F3EDE3',
        cream3:   '#EDE4D6',
        parchment:'#E8DDD0',
        ink:      '#1C1914',
        ink2:     '#2D2820',
        ink3:     '#3D3730',
        muted:    '#7A7068',
        muted2:   '#A89F95',
        terra:    '#C4622D',
        terra2:   '#A84E22',
        sage:     '#4A7C6F',
        sage2:    '#3A6259',
      },
      backgroundImage: {
        'terra-gradient': 'linear-gradient(135deg, #C4622D, #E07B3A)',
      },
      animation: {
        'drift1':    'drift1 8s ease-in-out infinite alternate',
        'drift2':    'drift2 10s ease-in-out infinite alternate',
        'drift3':    'drift3 12s ease-in-out infinite alternate',
        'breathe':   'breathe 2.5s ease-in-out infinite',
        'fadeUp':    'fadeUp 0.4s cubic-bezier(0.4,0,0.2,1)',
        'slideR':    'slideR 0.35s cubic-bezier(0.4,0,0.2,1)',
      },
      keyframes: {
        drift1:  { from:{transform:'translate(0,0) scale(1)'}, to:{transform:'translate(30px,20px) scale(1.08)'} },
        drift2:  { from:{transform:'translate(0,0) scale(1)'}, to:{transform:'translate(-20px,30px) scale(1.05)'} },
        drift3:  { from:{transform:'translate(0,0) scale(1)'}, to:{transform:'translate(15px,-25px) scale(1.1)'} },
        breathe: { '0%,100%':{opacity:'1',transform:'scale(1)'}, '50%':{opacity:'0.4',transform:'scale(0.75)'} },
        fadeUp:  { from:{opacity:'0',transform:'translateY(14px)'}, to:{opacity:'1',transform:'none'} },
        slideR:  { from:{transform:'translateX(110%)',opacity:'0'}, to:{transform:'none',opacity:'1'} },
      },
    },
  },
  plugins: [],
}
