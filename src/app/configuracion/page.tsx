import Header from '@/components/Header';

export default function ConfiguracionPage() {
  return (
    <div className="flex-1">
      <Header title="Configuración" subtitle="Administración del sistema" />
      <div className="p-6 grid grid-cols-2 gap-4">
        {[
          { icon: '🏛️', label: 'Requirenres', desc: 'Sindicatos y Obras Sociales' },
          { icon: '📜', label: 'CCT y Tarifas', desc: 'Convenios y tablas salariales' },
          { icon: '📅', label: 'Tabla de Feriados', desc: 'Días inhábiles del año' },
          { icon: '💸', label: 'Tasas de Interés', desc: 'Intereses aplicables a la deuda' },
          { icon: '📄', label: 'Plantillas de Documentos', desc: 'F.8000, F.7109, actas, etc.' },
          { icon: '🔐', label: 'Seguridad', desc: 'Contraseñas y accesos' },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-3xl">{item.icon}</div>
            <div>
              <div className="font-semibold text-[#1a3a5c]">{item.label}</div>
              <div className="text-sm text-gray-500">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
