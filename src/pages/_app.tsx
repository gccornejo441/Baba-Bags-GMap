import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { ThemeProvider } from "@material-tailwind/react";

import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
