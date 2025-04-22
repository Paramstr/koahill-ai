import localFont from 'next/font/local'

export const abcFavorit = localFont({
  src: './fonts/ABCFavoritExpandedVariable-Trial.ttf',
  variable: '--font-abc-favorit',
  display: 'swap',
})

export const abcDiatype = localFont({
  src: './fonts/ABCDiatypeVariable-Trial.ttf',
  variable: '--font-abc-diatype',
  display: 'swap',
})

export const geist = localFont({
  src: './fonts/Geist[wght].ttf',
  variable: '--font-geist',
  display: 'swap',
})

// If you plan to use the italic version separately:
// export const geistItalic = localFont({
//   src: './fonts/Geist-Italic[wght].ttf',
//   variable: '--font-geist-italic',
//   style: 'italic',
//   display: 'swap',
//   // weight: '100 900'
// }); 