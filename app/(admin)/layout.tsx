'use client'
import Header from "@ui/header";
import Sidebar from "@ui/sidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="bg-zinc-50">

      <div className="grid grid-cols-5 gap-5 h-screen items-center container mx-auto">

        <aside className="bg-white rounded-large  h-[95%] overflow-y-auto">
          <Sidebar />
        </aside>

        <main className="bg-white rounded-large p-5 col-span-4 h-[95%] overflow-y-auto relative">
          {children}
        </main>

      </div>
    </main>
  )
}