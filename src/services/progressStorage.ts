import AsyncStorage from '@react-native-async-storage/async-storage';

const ENTRIES_KEY = '@a-little-reason/completion-entries';

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