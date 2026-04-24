const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:4000/api';

export async function getDashboard() {
  const res = await fetch(`${API_BASE}/dashboard`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load dashboard');
  return res.json();
}

export async function getSessions() {
  const res = await fetch(`${API_BASE}/sessions`, { cache: 'no-store' });
  return res.json();
}

export async function getDecisions() {
  const res = await fetch(`${API_BASE}/decisions`, { cache: 'no-store' });
  return res.json();
}

export async function getFrictions() {
  const res = await fetch(`${API_BASE}/frictions`, { cache: 'no-store' });
  return res.json();
}
