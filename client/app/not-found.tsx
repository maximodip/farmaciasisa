import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">404 - Pagina no encontrada</h1>
      <p className="text-lg mb-8">Lo siento, la página que buscas no existe.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Volver al inicio
      </Link>
    </div>
  )
}
