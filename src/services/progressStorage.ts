import AsyncStorage from '@react-native-async-storage/async-storage';

const ENTRIES_KEY = '@a-little-reason/completion-entries';
const ACTIVE_MISSION_KEY = '@a-little-reason/active-mission';

export type ActiveMissionSession = {
  missionId: number;
  moodBefore: number;
};

function isActiveMissionSession(
  value: unknown,
): value is ActiveMissionSession {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const session = value as Record<string, unknown>;
  const missionId = session.missionId;
  const moodBefore = session.moodBefore;

  return (
    typeof missionId === 'number' &&
    Number.isInteger(missionId) &&
    typeof moodBefore === 'number' &&
    Number.isInteger(moodBefore) &&
    moodBefore >= 0 &&
    moodBefore <= 4
  );
}

export async function loadCompletionEntries<T>(): Promise<T[]> {
  const savedEntries = await AsyncStorage.getItem(ENTRIES_KEY);

  if (savedEntries === null) {
    return [];
  }

  const parsedEntries: unknown = JSON.parse(savedEntries);

  if (!Array.isArray(parsedEntries)) {
    throw new Error('Saved completion entries are not a list.');
  }

  return parsedEntries as T[];
}

export async function saveCompletionEntries<T>(
  entries: T[],
): Promise<void> {
  await AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
}

export async function loadActiveMissionSession(): Promise<ActiveMissionSession | null> {
  const savedSession = await AsyncStorage.getItem(ACTIVE_MISSION_KEY);

  if (savedSession === null) {
    return null;
  }

  const parsedSession: unknown = JSON.parse(savedSession);

  if (!isActiveMissionSession(parsedSession)) {
    await AsyncStorage.removeItem(ACTIVE_MISSION_KEY);
    return null;
  }

  return parsedSession;
}

export async function saveActiveMissionSession(
  session: ActiveMissionSession,
): Promise<void> {
  await AsyncStorage.setItem(
    ACTIVE_MISSION_KEY,
    JSON.stringify(session),
  );
}

export async function clearActiveMissionSession(): Promise<void> {
  await AsyncStorage.removeItem(ACTIVE_MISSION_KEY);
}