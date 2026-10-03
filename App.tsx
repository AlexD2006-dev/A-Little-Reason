import { useState } from 'react';
import { Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CheckInScreen from './src/screens/CheckInScreen';
import RecommendationsScreen from './src/screens/RecommendationsScreen';
import MissionScreen from './src/screens/MissionScreen';
import CompletionScreen from './src/screens/CompletionScreen';
import { recommendMissions } from './src/services/recommendations';
import type { Mission, MissionFilters } from './src/types/mission';

type ScreenName = 'checkin' | 'recommendations' | 'mission' | 'completion';

type CompletionEntry = {
  missionId: number;
  title: string;
  moodBefore: number;
  moodAfter: number;
  reflection: string;
  completedAt: string;
};

export default function App() {
  const [screen, setScreen] = useState<ScreenName>('checkin');
  const [recommendations, setRecommendations] = useState<Mission[]>([]);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [moodBefore, setMoodBefore] = useState(2);
  const [entries, setEntries] = useState<CompletionEntry[]>([]);

  function handleCheckIn(mood: number, filters: MissionFilters) {
    setMoodBefore(mood);
    setRecommendations(recommendMissions(filters));
    setScreen('recommendations');
  }

  function handleSave(moodAfter: number, reflection: string) {
    if (selectedMission === null) return;

    const entry: CompletionEntry = {
      missionId: selectedMission.id,
      title: selectedMission.title,
      moodBefore,
      moodAfter,
      reflection,
      completedAt: new Date().toISOString(),
    };

    const total = entries.length + 1;
    setEntries((current) => [entry, ...current]);

    Alert.alert(
      'Logged for this session',
      `${total} mission${total === 1 ? '' : 's'} recorded.`,
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
  }

  return (
    <>
      <StatusBar style="dark" />

      {screen === 'checkin' && (
        <CheckInScreen onContinue={handleCheckIn} />
      )}

      {screen === 'recommendations' && (
        <RecommendationsScreen
          missions={recommendations}
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
    </>
  );
}