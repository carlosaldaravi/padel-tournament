import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Link from "next/link";
import { signOut } from "@/auth";
import { PowerIcon } from "@heroicons/react/24/outline";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="w-full p-4">
        <nav className="bg-red flex justify-between">
          <Link href={`/`} className="h-full flex justify-center items-center">
            <button
              type="button"
              className="block rounded-md px-3 py-2 text-center
            text-sm font-semibold text-white shadow-sm hover:text-indigo-500
            focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Inicio
            </button>
            <span className="sr-only">Home</span>
          </Link>
          <form
            className="flex justify-end"
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:text-red-500 md:flex-none md:justify-start md:p-2 md:px-3">
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Salir</div>
            </button>
          </form>
        </nav>
      </header>
      {children}
    </>
  );
}
