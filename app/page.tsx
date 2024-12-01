import { Board } from "@/components/board"

export default function Home() {
  return (
    <main className="container mx-auto">
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8">Task Board</h1>
        <Board />
      </div>
    </main>
  )
}

