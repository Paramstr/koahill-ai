import localFont from 'next/font/local'

export const abcFavorit = localFont({
  src: [
    {
      path: './fonts/ABCFavorit-Light-Trial.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/ABCFavorit-Regular-Trial.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/ABCFavorit-Medium-Trial.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/ABCFavorit-Bold-Trial.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-abc-favorit',
}) 