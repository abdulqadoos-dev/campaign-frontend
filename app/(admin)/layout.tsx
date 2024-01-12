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
      <div className="grid grid-cols-5 gap-5 min-h-screen h-fit container mx-auto pt-10">
        <Sidebar />
        <section className="col-span-4 w-full bg-white rounded-large p-5 min-h-[95%] h-fit ">
            {children}
        </section>
      </div>
    </main>
  )
}