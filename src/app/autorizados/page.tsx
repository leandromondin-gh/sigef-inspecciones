import Header from '@/components/Header';
import { mockInspectores } from '@/lib/mock-data';

const ROL_LABELS: Record<string, string> = {
  ADMINISTRADOR: 'Administrador',
  INSPECTOR: 'Inspector / Auditor',
  LETRADO: 'Letrado',
  REQUIRENTE: 'Requirente',
};

const ROL_COLORS: Record<string, string> = {
  ADMINISTRADOR: 'bg-purple-100 text-purple-700',
  INSPECTOR: 'bg-blue-100 text-blue-700',
  LETRADO: 'bg-orange-100 text-orange-700',
  REQUIRENTE: 'bg-green-100 text-green-700',
};

export default function AutorizadosPage() {
  return (
    <div className="flex-1">
      <Header
        title="Autorizados"
        subtitle="Gestión de usuarios y permisos de acceso"
        actions={
          <button className="bg-[#0072BC] hover:bg-[#005f9e] text-white text-sm font-semibold px-4 py-2 rounded transition-colors">
            + Nuevo Usuario
          </button>
        }
      />
      <div className="p-6 space-y-5">
        <div className="bg-white rounded border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1a3a5c] text-white">
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase">Nombre</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase">Email</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase">Rol</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase">Estado</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockInspectores.map(usuario => (
                <tr key={usuario.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#1a3a5c] rounded-sm flex items-center justify-center text-white text-xs font-bold">
                        {usuario.nombre[0]}{usuario.apellido[0]}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{usuario.apellido}, {usuario.nombre}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{usuario.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-sm font-medium ${ROL_COLORS[usuario.rol]}`}>
                      {ROL_LABELS[usuario.rol]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 rounded-sm font-medium bg-green-100 text-green-700">Activo</span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-gray-500 hover:text-[#1a3a5c] border border-gray-200 rounded px-2 py-1">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded p-5 text-sm text-blue-700">
          <strong>Roles del sistema:</strong> Administrador (configuración global) · Inspector/Auditor (gestión de expedientes) ·
          Letrado (resolución de impugnaciones) · Requirente (consulta y firma final)
        </div>
      </div>
    </div>
  );
}
