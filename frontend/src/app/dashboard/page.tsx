import { TeamHeatmap, WorkDistributionChart } from '../../components/charts';
import { StatCard } from '../../components/stat-card';
import { getDashboard } from '../../lib/api';

export default async function DashboardPage() {
  const dashboard = await getDashboard();

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard title="Total Focus Time" value={`${dashboard.totals.coding + dashboard.totals.research} min`} />
        <StatCard title="Debugging Time" value={`${dashboard.totals.debugging} min`} />
        <StatCard title="Blocked Time" value={`${dashboard.totals.blocked} min`} />
        <StatCard title="Live Sessions" value={dashboard.activityFeed.length} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <WorkDistributionChart data={dashboard.workDistribution} />
        <TeamHeatmap data={dashboard.heatmap} />
      </div>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <h3 className="font-medium mb-4">Live Activity Feed</h3>
        <div className="space-y-2 text-sm">
          {dashboard.activityFeed.map((item: any) => (
            <div key={item.id} className="p-3 rounded-lg bg-slate-800/80">
              <span className="font-medium">{item.developer}</span> on {item.type} — {item.goal}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
