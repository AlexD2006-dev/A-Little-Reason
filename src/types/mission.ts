export type EnergyLevel = 'low' | 'medium' | 'high';
export type MissionSetting = 'outdoor' | 'indoor';
export type MissionCost = 'free' | 'small';
export type TimeLimit = 15 | 30 | 60;
export type SocialLimit = 1 | 2 | 3 | 4;
export type SettingPreference = MissionSetting | 'either';

export type Mission = {
  id: number;
  title: string;
  description: string;
  category: string;
  energy: EnergyLevel;
  timeMinutes: TimeLimit;
  setting: MissionSetting;
  social: SocialLimit;
  cost: MissionCost;
  guide: string[];
};

export type MissionFilters = {
  energy: EnergyLevel | null;
  time: TimeLimit | null;
  setting: SettingPreference | null;
  social: SocialLimit | null;
  cost: MissionCost | null;
};