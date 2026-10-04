import { useEffect, useRef, useState } from 'react';
import { Accelerometer } from 'expo-sensors';
import { Pressable, ScrollView, Text, View } from 'react-native';
import type { Mission, SocialLimit } from '../types/mission';
import { styles } from './RecommendationsScreen.styles';

type RecommendationsScreenProps = {
  missions: Mission[];
  onRefresh: () => void;
  onPick: (mission: Mission) => void;
  onBack: () => void;
};

const socialLabels: Record<SocialLimit, string> = {
  1: 'Almost no interaction',
  2: 'Being around people',
  3: 'Brief interaction',
  4: 'Optional social step',
};

export default function RecommendationsScreen({
  missions,
  onRefresh,
  onPick,
  onBack,
}: RecommendationsScreenProps) {
  const [sensorAvailable, setSensorAvailable] = useState<boolean | null>(null);
  const onRefreshRef = useRef(onRefresh);

  useEffect(() => {
    onRefreshRef.current = onRefresh;
  }, [onRefresh]);

  useEffect(() => {
    if (missions.length === 0) {
      setSensorAvailable(null);
      return;
    }

    let isActive = true;
    let lastShakeAt = 0;
    let subscription: ReturnType<typeof Accelerometer.addListener> | undefined;

    async function startShakeDetection() {
      try {
        const available = await Accelerometer.isAvailableAsync();

        if (!isActive) {
          return;
        }

        if (!available) {
          setSensorAvailable(false);
          return;
        }

        Accelerometer.setUpdateInterval(150);

        subscription = Accelerometer.addListener(({ x, y, z }) => {
          const acceleration = Math.sqrt(x * x + y * y + z * z);
          const now = Date.now();

          // Ignore small movements and prevent one shake from refreshing repeatedly.
          if (acceleration > 2 && now - lastShakeAt > 1800) {
            lastShakeAt = now;
            onRefreshRef.current();
          }
        });

        setSensorAvailable(true);
      } catch (error) {
        console.warn('Could not start shake detection:', error);

        if (isActive) {
          setSensorAvailable(false);
        }
      }
    }

    void startShakeDetection();

    return () => {
      isActive = false;
      subscription?.remove();
    };
  }, [missions.length]);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Three small options</Text>
      <Text style={styles.sub}>
        No wrong pick. Choose whichever one you would actually do.
      </Text>

      {missions.length > 0 && (
        <View style={styles.refreshArea}>
          <Text style={styles.refreshHint}>
            {sensorAvailable === false
              ? 'Shake refresh is unavailable, but you can tap below.'
              : 'Gently shake your phone—or tap below—for another set.'}
          </Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Show a different set of mission recommendations"
            accessibilityHint="Refreshes the recommendations using the same check-in."
            onPress={onRefresh}
            style={styles.refreshButton}
          >
            <Text style={styles.refreshButtonText}>Try another set</Text>
          </Pressable>
        </View>
      )}

      {missions.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Nothing quite fits</Text>
          <Text style={styles.emptyText}>
            Try allowing a little more time or energy, then check again.
          </Text>
        </View>
      ) : (
        missions.map((mission) => (
          <Pressable
            key={mission.id}
            accessibilityRole="button"
            accessibilityLabel={`${mission.title}. ${mission.description}`}
            onPress={() => onPick(mission)}
            style={styles.card}
          >
            <Text style={styles.category}>{mission.category}</Text>
            <Text style={styles.missionTitle}>{mission.title}</Text>
            <Text style={styles.description}>{mission.description}</Text>

            <View style={styles.metaRow}>
              <Text style={styles.meta}>{mission.timeMinutes} min</Text>
              <Text style={styles.meta}>{mission.setting}</Text>
              <Text style={styles.meta}>
                {socialLabels[mission.social]}
              </Text>
            </View>
          </Pressable>
        ))
      )}

      <Pressable
        accessibilityRole="button"
        onPress={onBack}
        style={styles.backButton}
      >
        <Text style={styles.backText}>‹ Change check-in</Text>
      </Pressable>
    </ScrollView>
  );
}