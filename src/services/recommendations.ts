import { MISSIONS } from '../data/missions';
import type {
  EnergyLevel,
  Mission,
  MissionFilters,
} from '../types/mission';

const energyRank: Record<EnergyLevel, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

function scoreMission(mission: Mission, filters: MissionFilters): number {
  let score = 0;

  if (filters.energy === mission.energy) score += 3;

  if (
    filters.setting !== null &&
    filters.setting !== 'either' &&
    filters.setting === mission.setting
  ) {
    score += 2;
  }

  if (filters.social !== null) {
    score += 3 - Math.abs(filters.social - mission.social);
  }

  if (filters.time !== null) {
    score += (filters.time - mission.timeMinutes) * 0.02;
  }

  if (filters.cost === 'small' && mission.cost === 'small') {
    score += 1.5;
  }

  return score;
}

export function recommendMissions(filters: MissionFilters): Mission[] {
  const ranked = MISSIONS
    .filter((mission) => {
      if (
        filters.time !== null &&
        mission.timeMinutes > filters.time
      ) {
        return false;
      }

      if (
        filters.energy !== null &&
        energyRank[mission.energy] > energyRank[filters.energy]
      ) {
        return false;
      }

      if (
        filters.setting !== null &&
        filters.setting !== 'either' &&
        mission.setting !== filters.setting
      ) {
        return false;
      }

      if (
        filters.social !== null &&
        mission.social > filters.social
      ) {
        return false;
      }

      if (filters.cost === 'free' && mission.cost !== 'free') {
        return false;
      }

      return true;
    })
    .map((mission) => ({
      mission,
      score: scoreMission(mission, filters),
    }))
    .sort((a, b) => b.score - a.score);

  const recommendations: Mission[] = [];
  const usedCategories = new Set<string>();

  // Prefer variety across categories when there are enough matches.
  for (const item of ranked) {
    if (!usedCategories.has(item.mission.category)) {
      recommendations.push(item.mission);
      usedCategories.add(item.mission.category);
    }

    if (recommendations.length === 3) break;
  }

  // If fewer than three categories match, fill from the remaining ranked missions.
  for (const item of ranked) {
    if (recommendations.length === 3) break;

    if (!recommendations.some((mission) => mission.id === item.mission.id)) {
      recommendations.push(item.mission);
    }
  }

  return recommendations;
}