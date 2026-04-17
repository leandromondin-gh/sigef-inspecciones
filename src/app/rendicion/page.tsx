import Header from '@/components/Header';
import { mockExpedientes } from '@/lib/mock-data';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);
}

export default function RendicionPage() {
  const totalDeuda = mockExpedientes.reduce((acc, e) => acc + (e.montoDeuda ?? 0), 0);
  const cobrados = mockExpedientes.filter(e => e.estado === 'FINALIZADO' && e.montoDeuda === 0);
  const enGestion = mockExpedientes.filter(e => e.estado === 'D_COBRO_CIERRE');
  const determinados = mockExpedientes.filter(e => e.montoDeuda && e.montoDeuda > 0 && e.estado !== 'FINALIZADO');

  return (
    <div className="flex-1">
      <Header title="Rendición de Cuentas" subtitle="Panel contable y financiero" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-orange-500">
            <div className="text-2xl font-bold text-[#1a3a5c]">{formatCurrency(totalDeuda)}</div>
            <div className="text-sm text-gray-600 mt-1">Deuda Total Determinada</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-teal-500">
            <div className="text-2xl font-bold text-[#1a3a5c]">{enGestion.length}</div>
            <div className="text-sm text-gray-600 mt-1">En Gestión de Cobro</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-green-500">
            <div className="text-2xl font-bold text-[#1a3a5c]">{cobrados.length}</div>
            <div className="text-sm text-gray-600 mt-1">Expedientes Cobrados</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-[#1a3a5c] mb-4">Deuda por Expediente</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 text-xs font-semibold text-gray-500 uppercase">Expediente</th>
                <th className="text-left py-2 text-xs font-semibold text-gray-500 uppercase">Empresa</th>
                <th className="text-left py-2 text-xs font-semibold text-gray-500 uppercase">Estado</th>
                <th className="text-right py-2 text-xs font-semibold text-gray-500 uppercase">Monto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {determinados.map(exp => (
                <tr key={exp.id}>
                  <td className="py-2 font-medium text-[#1a3a5c]">{exp.numeroExpediente}</td>
                  <td className="py-2 text-gray-600">{exp.empresa.razonSocial}</td>
                  <td className="py-2 text-gray-500">{exp.estado.replace(/_/g, ' ')}</td>
                  <td className="py-2 text-right font-semibold text-orange-600">{formatCurrency(exp.montoDeuda!)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-blue-700">
          <strong>Próximamente:</strong> Panel completo con gráficos de recaudación, planes de pago activos,
          vencimientos de cuotas, y exportación a Excel/PDF.
        </div>
      </div>
    </div>
  );
}
