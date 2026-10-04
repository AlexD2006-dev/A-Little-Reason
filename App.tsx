import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CheckInScreen from './src/screens/CheckInScreen';
import RecommendationsScreen from './src/screens/RecommendationsScreen';
import MissionScreen from './src/screens/MissionScreen';
import CompletionScreen from './src/screens/CompletionScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import {
  loadCompletionEntries,
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

function getMissionSetKey(missions: Mission[]) {
  return missions
    .map((mission) => mission.id)
    .sort((a, b) => a - b)
    .join(',');
}

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

    async function restoreEntries() {
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
      } finally {
        if (isActive) {
          setStorageReady(true);
        }
      }
    }

    void restoreEntries();

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

    if (
      getMissionSetKey(nextRecommendations) ===
      getMissionSetKey(recommendations)
    ) {
      Alert.alert(
        'No more matches right now',
        'These are the available ideas for your current check-in. Try changing one of your answers to see other options.',
      );
      return;
    }

    setRecommendations(nextRecommendations);
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
          onPick={(mission) => {
            setSelectedMission(mission);
            setScreen('mission');
          }}
          onBack={() => setScreen('checkin')}
        />
      )}

      {screen === 'mission' && selectedMission !== null && (
        <MissionScreen
          mission={selectedMission}
          onComplete={() => setScreen('completion')}
          onBack={() => setScreen('recommendations')}
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