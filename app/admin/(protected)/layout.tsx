import Link from "next/link";
import { cerrarSesion } from "../actions";
import { getPerfilUsuario } from "@/lib/auth";
export default async function AdminLayout({children}:{children:React.ReactNode}) {
  const perfil=await getPerfilUsuario();
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-4">
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/admin" className="text-sage-dark hover:underline">Citas</Link>
          <Link href="/admin/disponibilidad" className="text-sage-dark hover:underline">Horarios</Link>
          {perfil?.rol==="admin"&&<Link href="/admin/profesionales" className="text-sage-dark hover:underline">Profesionales</Link>}
        </nav>
        <form action={cerrarSesion}>
          <button type="submit" className="text-sm text-ink/60 hover:text-amber-dark">Cerrar sesión</button>
        </form>
      </div>
      <p className="text-xs text-ink/40 mb-8">{perfil?.rol==="admin"?"Vista de administradora — todas las citas":`Sesión de ${perfil?.nombre??"profesional"} — tus citas`}</p>
      {children}
    </div>
  );
}
