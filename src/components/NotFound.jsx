import React from 'react'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Halaman tidak ditemukan</h1>
      <h1>404</h1>
      <button className="border-2 rounded-full px-4 py-2 text-white font-bold bg-green-500" onClick={() => window.history.back()}>Kembali</button>
    </div>
  )
}

export default NotFound