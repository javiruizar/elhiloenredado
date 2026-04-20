import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-sm border">
        <h1 className="text-2xl font-bold text-center text-primary mb-6">
          Iniciar Sesión
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}