export type Badge = {
  icon: string;
  label: string;
  days: number;
  color: string;
};

export const BADGES: Badge[] = [
  { icon: '🌱', label: 'Sprouting',  days: 3,   color: 'bg-green-900 text-green-300 border-green-700' },
  { icon: '🔥', label: 'On Fire',    days: 7,   color: 'bg-orange-900 text-orange-300 border-orange-700' },
  { icon: '⚡', label: 'Electric',   days: 14,  color: 'bg-yellow-900 text-yellow-300 border-yellow-700' },
  { icon: '💎', label: 'Diamond',    days: 30,  color: 'bg-blue-900 text-blue-300 border-blue-700' },
  { icon: '🏆', label: 'Champion',   days: 60,  color: 'bg-purple-900 text-purple-300 border-purple-700' },
  { icon: '👑', label: 'Royalty',    days: 100, color: 'bg-yellow-800 text-yellow-200 border-yellow-600' },
  { icon: '🌟', label: 'Legend',     days: 365, color: 'bg-pink-900 text-pink-200 border-pink-600' },
];

export function getEarnedBadges(bestStreak: number): Badge[] {
  return BADGES.filter(b => bestStreak >= b.days);
}

export function getNextBadge(bestStreak: number): Badge | null {
  return BADGES.find(b => bestStreak < b.days) ?? null;
}
