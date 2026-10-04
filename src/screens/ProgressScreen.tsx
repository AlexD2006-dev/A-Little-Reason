import { Pressable, ScrollView, Text, View } from 'react-native';
import type { CompletionEntry } from '../types/completion';
import { styles } from './ProgressScreen.styles';

type ProgressScreenProps = {
  entries: CompletionEntry[];
  onBack: () => void;
};

const MOODS = ['😔', '😕', '😐', '🙂', '😊'];

function getMoodEmoji(value: number | string | null | undefined): string {
  if (value === null || value === undefined || value === '') {
    return '—';
  }

  const index = Number(value);

  if (!Number.isInteger(index) || index < 0 || index >= MOODS.length) {
    return '—';
  }

  return MOODS[index];
}

export default function ProgressScreen({
  entries,
  onBack,
}: ProgressScreenProps) {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const thisWeek = entries.filter(
    (entry) => new Date(entry.completedAt) >= weekAgo,
  ).length;

  const averageMoodChange =
    entries.length > 0
      ? entries.reduce(
          (total, entry) =>
            total + Number(entry.moodAfter) - Number(entry.moodBefore),
          0,
        ) / entries.length
      : null;

  const moodChangeLabel =
    averageMoodChange === null
      ? '—'
      : `${averageMoodChange > 0 ? '+' : ''}${averageMoodChange.toFixed(1)}`;

  const higherMoodCount = entries.filter(
    (entry) => Number(entry.moodAfter) > Number(entry.moodBefore),
  ).length;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.topbar}>
        <Text style={styles.wordmark}>
          A Little <Text style={styles.wordmarkEm}>Reason</Text>
        </Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Return to today's check-in"
          onPress={onBack}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Today</Text>
        </Pressable>
      </View>

      <Text style={styles.headline}>Your progress</Text>
      <Text style={styles.sub}>
        A quiet record of the small things you’ve done. No streaks or
        comparisons.
      </Text>

      <View style={styles.statsGrid}>
        <View style={styles.statRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{entries.length}</Text>
            <Text style={styles.statLabel}>missions completed</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{thisWeek}</Text>
            <Text style={styles.statLabel}>in the last 7 days</Text>
          </View>
        </View>

        <View style={styles.statRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{moodChangeLabel}</Text>
            <Text style={styles.statLabel}>average mood change</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{higherMoodCount}</Text>
            <Text style={styles.statLabel}>with a higher mood afterward</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent missions</Text>

      {entries.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Nothing logged yet</Text>
          <Text style={styles.emptyText}>
            Complete a mission and it’ll appear here.
          </Text>
        </View>
      ) : (
        entries.slice(0, 10).map((entry) => {
          const date = new Date(entry.completedAt).toLocaleDateString(
            undefined,
            { month: 'short', day: 'numeric' },
          );

          return (
            <View
              key={`${entry.completedAt}-${entry.missionId}`}
              style={styles.logEntry}
            >
              <View style={styles.logDetails}>
                <Text style={styles.logTitle}>{entry.title}</Text>
                <Text style={styles.logDate}>{date}</Text>
              </View>

              <View style={styles.moodPair}>
                <Text style={styles.moodEmoji}>
                  {getMoodEmoji(entry.moodBefore)}
                </Text>
                <Text style={styles.moodArrow}>→</Text>
                <Text style={styles.moodEmoji}>
                  {getMoodEmoji(entry.moodAfter)}
                </Text>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}