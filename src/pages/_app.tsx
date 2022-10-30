import type { AppProps } from 'next/app'
import ProgressProps from '@/atoms/ProgressProps'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ProgressProps />
      <Component {...pageProps} />
    </>
  )
}
export default MyApp