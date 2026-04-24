import { getFrictions } from '../../lib/api';

export default async function FrictionPage() {
  const frictions = await getFrictions();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Friction Tracking</h1>
      {frictions.map((friction: any) => (
        <div key={friction.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <p className="font-medium">{friction.type}</p>
          <p className="text-sm text-slate-300">{friction.description}</p>
          <p className="text-xs text-red-300 mt-2">Time lost: {friction.timeLost} min</p>
        </div>
      ))}
    </div>
  );
}
