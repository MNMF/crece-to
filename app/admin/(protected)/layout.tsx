import Link from "next/link";
import { cerrarSesion } from "../actions";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/admin" className="text-sage-dark hover:underline">
            Citas
          </Link>
          <Link
            href="/admin/disponibilidad"
            className="text-sage-dark hover:underline"
          >
            Horarios
          </Link>
        </nav>
        <form action={cerrarSesion}>
          <button
            type="submit"
            className="text-sm text-ink/60 hover:text-terracotta-dark"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}
