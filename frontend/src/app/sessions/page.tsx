import { getSessions } from '../../lib/api';

export default async function SessionsPage() {
  const sessions = await getSessions();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Work Sessions</h1>
      {sessions.map((session: any) => (
        <article key={session.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex justify-between">
            <h3 className="font-medium">{session.goal}</h3>
            <span className="text-xs bg-slate-800 px-2 py-1 rounded">{session.sessionType}</span>
          </div>
          <p className="text-sm text-slate-400 mt-2">Reality: {session.reality}</p>
          <p className="text-sm mt-2">Decision: {session.decisionTaken}</p>
        </article>
      ))}
    </div>
  );
}
