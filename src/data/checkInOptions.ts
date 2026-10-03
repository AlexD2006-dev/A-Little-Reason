export const MOOD_OPTIONS = [
  { emoji: '😔', label: 'low' },
  { emoji: '😕', label: 'flat' },
  { emoji: '😐', label: 'okay' },
  { emoji: '🙂', label: 'good' },
  { emoji: '😊', label: 'great' },
] as const;

export const ENERGY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
] as const;

export const TIME_OPTIONS = [
  { value: 15, label: '15 min' },
  { value: 30, label: '30 min' },
  { value: 60, label: '60 min+' },
] as const;

export const SETTING_OPTIONS = [
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'indoor', label: 'Indoor' },
  { value: 'either', label: 'Either' },
] as const;

export const SOCIAL_OPTIONS = [
  { value: 1, label: 'Alone is best' },
  { value: 2, label: 'Around people, fine' },
  { value: 3, label: 'Brief chat, okay' },
  { value: 4, label: 'Up for a small challenge' },
] as const;

export const BUDGET_OPTIONS = [
  { value: 'free', label: 'Free only' },
  { value: 'small', label: 'Small spend okay' },
] as const;