import { getDecisions } from '../../lib/api';

export default async function DecisionsPage() {
  const decisions = await getDecisions();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Decision Log</h1>
      {decisions.map((decision: any) => (
        <div key={decision.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <h3 className="font-medium">{decision.problem}</h3>
          <p className="text-sm text-slate-400">Chosen: {decision.chosenSolution}</p>
          <p className="text-sm mt-1">Reasoning: {decision.reasoning}</p>
        </div>
      ))}
    </div>
  );
}
