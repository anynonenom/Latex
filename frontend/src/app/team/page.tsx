import { getDashboard } from '../../lib/api';

export default async function TeamPage() {
  const dashboard = await getDashboard();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Team Analytics</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {dashboard.teamAnalytics.map((member: any) => (
          <div key={member.name} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <h3 className="font-medium">{member.name}</h3>
            <p className="text-sm text-slate-400">Sessions: {member.sessionCount}</p>
            <p className="text-sm text-slate-400">Avg confidence: {member.avgConfidence}</p>
            <p className="text-sm text-slate-400">Blocked minutes: {member.blockedMinutes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
