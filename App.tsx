import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CheckInScreen from './src/screens/CheckInScreen';
import RecommendationsScreen from './src/screens/RecommendationsScreen';
import MissionScreen from './src/screens/MissionScreen';
import CompletionScreen from './src/screens/CompletionScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import { MISSIONS } from './src/data/missions';
import {
  clearActiveMissionSession,
  loadActiveMissionSession,
  loadCompletionEntries,
  saveActiveMissionSession,
  saveCompletionEntries,
} from './src/services/progressStorage';
import { recommendMissions } from './src/services/recommendations';
import type { CompletionEntry } from './src/types/completion';
import type { Mission, MissionFilters } from './src/types/mission';
import { appStyles } from './App.styles';

type ScreenName =
  | 'checkin'
  | 'recommendations'
  | 'mission'
  | 'completion'
  | 'progress';

export default function App() {
  const [screen, setScreen] = useState<ScreenName>('checkin');
  const [recommendations, setRecommendations] = useState<Mission[]>([]);
  const [activeFilters, setActiveFilters] = useState<MissionFilters | null>(
    null,
  );
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [moodBefore, setMoodBefore] = useState(2);
  const [entries, setEntries] = useState<CompletionEntry[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const isSaving = useRef(false);

  useEffect(() => {
    let isActive = true;

    async function restoreAppState() {
      try {
        const savedEntries =
          await loadCompletionEntries<CompletionEntry>();

        if (isActive) {
          setEntries(savedEntries);
        }
      } catch (error) {
        console.warn('Could not load saved progress:', error);

        if (isActive) {
          Alert.alert(
            'Could not load saved progress',
            'The app can still be used, but the saved progress could not be read.',
          );
        }
      }

      try {
        const savedSession = await loadActiveMissionSession();

        if (isActive && savedSession !== null) {
          const mission = MISSIONS.find(
            (item) => item.id === savedSession.missionId,
          );

          if (mission !== undefined) {
            setSelectedMission(mission);
            setMoodBefore(savedSession.moodBefore);
            setScreen('mission');
          } else {
            await clearActiveMissionSession();
          }
        }
      } catch (error) {
        console.warn('Could not restore the unfinished mission:', error);

        if (isActive) {
          Alert.alert(
            'Could not restore your mission',
            'Your saved progress is still available. Start a new check-in to continue.',
          );
        }
      } finally {
        if (isActive) {
          setStorageReady(true);
        }
      }
    }

    void restoreAppState();

    return () => {
      isActive = false;
    };
  }, []);

  function handleCheckIn(mood: number, filters: MissionFilters) {
    setMoodBefore(mood);
    setActiveFilters(filters);
    setRecommendations(recommendMissions(filters));
    setScreen('recommendations');
  }

  function handleRefreshRecommendations() {
    if (activeFilters === null) {
      return;
    }

    const nextRecommendations = recommendMissions(
      activeFilters,
      recommendations.map((mission) => mission.id),
    );

    const currentSetKey = recommendations
      .map((mission) => mission.id)
      .sort((a, b) => a - b)
      .join(',');

    const nextSetKey = nextRecommendations
      .map((mission) => mission.id)
      .sort((a, b) => a - b)
      .join(',');

    if (nextSetKey === currentSetKey) {
      Alert.alert(
        'No more matches right now',
        'These are the available ideas for your current check-in. Try changing one of your answers to see other options.',
      );
      return;
    }

    setRecommendations(nextRecommendations);
  }

  async function handlePickMission(mission: Mission) {
    let sessionSaved = true;

    try {
      await saveActiveMissionSession({
        missionId: mission.id,
        moodBefore,
      });
    } catch (error) {
      sessionSaved = false;
      console.warn('Could not save the active mission:', error);
    }

    setSelectedMission(mission);
    setScreen('mission');

    if (!sessionSaved) {
      Alert.alert(
        'Mission selected',
        'You can continue now, but this mission may not be restored if the app closes.',
      );
    }
  }

  async function handleBackFromMission() {
    try {
      await clearActiveMissionSession();
    } catch (error) {
      console.warn('Could not clear the active mission:', error);
    }

    setSelectedMission(null);
    setScreen(activeFilters === null ? 'checkin' : 'recommendations');
  }

  async function handleSave(moodAfter: number, reflection: string) {
    if (selectedMission === null || isSaving.current) {
      return;
    }

    isSaving.current = true;

    const entry: CompletionEntry = {
      missionId: selectedMission.id,
      title: selectedMission.title,
      moodBefore,
      moodAfter,
      reflection,
      completedAt: new Date().toISOString(),
    };

    const updatedEntries = [entry, ...entries];

    try {
      await saveCompletionEntries(updatedEntries);
      setEntries(updatedEntries);

      try {
        await clearActiveMissionSession();
      } catch (error) {
        console.warn('Could not clear the active mission:', error);
      }

      Alert.alert(
        'Saved on this device',
        `${updatedEntries.length} mission${
          updatedEntries.length === 1 ? '' : 's'
        } recorded.`,
        [
          {
            text: 'Done',
            onPress: () => {
              setSelectedMission(null);
              setScreen('checkin');
            },
          },
        ],
      );
    } catch (error) {
      console.warn('Could not save progress:', error);

      Alert.alert(
        'Could not save progress',
        'Your mission could not be saved on this device. Please try again.',
      );
    } finally {
      isSaving.current = false;
    }
  }

  if (!storageReady) {
    return (
      <View style={appStyles.loadingScreen}>
        <StatusBar style="dark" />
        <ActivityIndicator
          size="large"
          color="#55705C"
          accessibilityLabel="Loading saved progress"
        />
        <Text style={appStyles.loadingText}>Loading your progress...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />

      {screen === 'checkin' && (
        <CheckInScreen
          onContinue={handleCheckIn}
          onOpenProgress={() => setScreen('progress')}
        />
      )}

      {screen === 'recommendations' && (
        <RecommendationsScreen
          missions={recommendations}
          onRefresh={handleRefreshRecommendations}
          onPick={handlePickMission}
          onBack={() => setScreen('checkin')}
        />
      )}

      {screen === 'mission' && selectedMission !== null && (
        <MissionScreen
          mission={selectedMission}
          onComplete={() => setScreen('completion')}
          onBack={handleBackFromMission}
        />
      )}

      {screen === 'completion' && selectedMission !== null && (
        <CompletionScreen
          mission={selectedMission}
          moodBefore={moodBefore}
          onSave={handleSave}
        />
      )}

      {screen === 'progress' && (
        <ProgressScreen
          entries={entries}
          onBack={() => setScreen('checkin')}
        />
      )}
    </>
  );
}