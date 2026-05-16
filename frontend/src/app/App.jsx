import React from 'react'
import { Outlet } from 'react-router'

const App = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <header className="px-8 py-6">
        <h1 className="text-3xl font-semibold">Hiren</h1>
      </header>
      <main className="px-8 pb-10">
        <Outlet />
      </main>
    </div>
  )
}

export default App