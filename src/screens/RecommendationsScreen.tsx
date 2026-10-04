import { useEffect, useRef, useState } from 'react';
import { Accelerometer } from 'expo-sensors';
import { AppState, Pressable, ScrollView, Text, View } from 'react-native';
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
    let sensorCanRun = false;
    let hasCheckedAvailability = false;
    let isCheckingAvailability = false;
    let lastShakeAt = 0;
    let previousReading: { x: number; y: number; z: number } | null = null;
    let subscription: ReturnType<typeof Accelerometer.addListener> | undefined;

    function stopListening() {
      subscription?.remove();
      subscription = undefined;
      previousReading = null;
    }

    function startListening() {
      if (!isActive || !sensorCanRun || subscription) {
        return;
      }

      Accelerometer.setUpdateInterval(80);

      subscription = Accelerometer.addListener(({ x, y, z }) => {
        const currentReading = { x, y, z };

        if (previousReading !== null) {
          const movementChange = Math.sqrt(
            (x - previousReading.x) ** 2 +
              (y - previousReading.y) ** 2 +
              (z - previousReading.z) ** 2,
          );
          const now = Date.now();

          // Detect a deliberate movement, with a short pause between refreshes.
          if (movementChange >= 0.85 && now - lastShakeAt > 1300) {
            lastShakeAt = now;
            onRefreshRef.current();
          }
        }

        previousReading = currentReading;
      });
    }

    async function checkAvailabilityAndStart() {
      if (
        !isActive ||
        hasCheckedAvailability ||
        isCheckingAvailability
      ) {
        return;
      }

      isCheckingAvailability = true;

      try {
        const available = await Accelerometer.isAvailableAsync();

        if (!isActive) {
          return;
        }

        hasCheckedAvailability = true;
        sensorCanRun = available;
        setSensorAvailable(available);

        if (available && AppState.currentState === 'active') {
          startListening();
        }
      } catch (error) {
        console.warn('Could not start shake detection:', error);

        if (isActive) {
          hasCheckedAvailability = true;
          sensorCanRun = false;
          setSensorAvailable(false);
        }
      } finally {
        isCheckingAvailability = false;
      }
    }

    const appStateSubscription = AppState.addEventListener(
      'change',
      (nextState) => {
        if (nextState === 'active') {
          if (hasCheckedAvailability) {
            startListening();
          } else {
            void checkAvailabilityAndStart();
          }
        } else {
          stopListening();
        }
      },
    );

    // Android can report loss of focus (for example, when opening the
    // notification shade) without changing the app's active state.
    const blurSubscription = AppState.addEventListener(
      'blur',
      stopListening,
    );

    const focusSubscription = AppState.addEventListener('focus', () => {
      if (AppState.currentState === 'active') {
        if (hasCheckedAvailability) {
          startListening();
        } else {
          void checkAvailabilityAndStart();
        }
      }
    });

    void checkAvailabilityAndStart();

    return () => {
      isActive = false;
      stopListening();
      appStateSubscription.remove();
      blurSubscription.remove();
      focusSubscription.remove();
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
              : 'Give your phone one deliberate shake—or tap below—for another set.'}
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