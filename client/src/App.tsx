import { LoginForm } from "@/components/login-form";

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold underline">Hello React, Fastify & Genezio!</h1>
      <LoginForm/>
    </div>
  )
};

export { App };
