import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import Header from "./ui/header";
import Sidebar from "./ui/sidebar";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Campaigns',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <main className="bg-zinc-50">
          <div className="grid grid-cols-5 gap-10 place-items-center min-h-screen container mx-auto">
            <Sidebar />
            <section className="col-span-4 w-full overflow-clip h-[95%]">
              <Header />
              <div className="bg-white rounded-large p-5 min-h-[89%]">
                {children}
              </div>
            </section>
          </div>
        </main>

      </body>
    </html>
  )
}
