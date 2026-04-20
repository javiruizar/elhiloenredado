import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
      <h1 className="text-6xl font-lora text-sand mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Página No Encontrada</h2>
      <p className="text-gray-500 mb-6 max-w-sm">
        Lo sentimos, la página que buscas no existe o ha sido movida.
        Quizás quieras volver al inicio.
      </p>
      <Link href="/" className="px-6 py-2 bg-sand text-primary font-bold rounded-md hover:bg-opacity-90 transition-colors">
          Ir a la página de inicio
      </Link>
    </div>
  );
}
