import Sidebar from "../ui/sidebar"
import Header from "../ui/header";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
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
  )
}
