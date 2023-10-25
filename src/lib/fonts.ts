import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
  Poppins,
  Montserrat,
} from 'next/font/google';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const fontPoppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600'],
  display: 'swap',
  adjustFontFallback: false,
});

export const fontMontserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont-serrat',
  display: 'swap',
  adjustFontFallback: false,
});
