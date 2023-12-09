import { getClub } from "@/app/database/db";
import { Club } from "@/app/lib/definitions";
import LoginForm from "@/app/ui/login-form";

export default async function LoginPage() {
  const club: Club = await getClub();
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="text-white">Bienvendio al torneo {club.name}</div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
