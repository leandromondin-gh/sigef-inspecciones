import { mockExpedientes } from '@/lib/mock-data';
import ExpedienteDetalle from './ExpedienteDetalle';

export async function generateStaticParams() {
  return mockExpedientes.map((e) => ({ id: e.id }));
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <ExpedienteDetalle params={params} />;
}
