import './globals.css'
import { Roboto } from 'next/font/google'
import Nav from './auth/Nav'

 
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: "--font-roboto"
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`mx-4 md:mx-48 xl:mx-96 ${roboto.variable}`}>
        <Nav/>
        {children}
      </body>
    </html>
  )
}
