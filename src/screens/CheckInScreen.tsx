import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import ChoiceGroup from '../components/ChoiceGroup';
import {
  BUDGET_OPTIONS,
  ENERGY_OPTIONS,
  MOOD_OPTIONS,
  SETTING_OPTIONS,
  SOCIAL_OPTIONS,
  TIME_OPTIONS,
} from '../data/checkInOptions';
import type { MissionFilters } from '../types/mission';
import { styles } from './CheckInScreen.styles';

type CheckInScreenProps = {
  onContinue: (moodBefore: number, filters: MissionFilters) => void;
  onOpenProgress: () => void;
};

export default function CheckInScreen({
  onContinue,
  onOpenProgress,
}: CheckInScreenProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [filters, setFilters] = useState<MissionFilters>({
    energy: null,
    time: null,
    setting: null,
    social: null,
    cost: null,
  });

  function updateFilter<Key extends keyof MissionFilters>(
    key: Key,
    value: MissionFilters[Key],
  ) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  const ready =
    selectedMood !== null &&
    Object.values(filters).every((value) => value !== null);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.topbar}>
        <Text style={styles.wordmark}>
          A Little <Text style={styles.wordmarkEm}>Reason</Text>
        </Text>
        <Text style={styles.stepTag}>Check-in</Text>
      </View>

      <Text style={styles.headline}>How are you, right now?</Text>
      <Text style={styles.sub}>
        Answer honestly. This is about what feels realistic today, not what
        feels ambitious.
      </Text>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Current mood</Text>

        <View style={styles.moodRow}>
          {MOOD_OPTIONS.map((mood, index) => (
            <Pressable
              key={mood.label}
              accessibilityRole="button"
              accessibilityLabel={`${mood.label} mood`}
              accessibilityState={{ selected: selectedMood === index }}
              onPress={() => setSelectedMood(index)}
              style={[
                styles.moodButton,
                selectedMood === index && styles.moodButtonSelected,
              ]}
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.moodLabels}>
          <Text style={styles.moodLabel}>low</Text>
          <Text style={styles.moodLabel}>great</Text>
        </View>
      </View>

      <ChoiceGroup
        label="Energy"
        options={ENERGY_OPTIONS}
        selected={filters.energy}
        onSelect={(value) => updateFilter('energy', value)}
      />

      <ChoiceGroup
        label="Time available"
        options={TIME_OPTIONS}
        selected={filters.time}
        onSelect={(value) => updateFilter('time', value)}
      />

      <ChoiceGroup
        label="Setting"
        options={SETTING_OPTIONS}
        selected={filters.setting}
        onSelect={(value) => updateFilter('setting', value)}
      />

      <ChoiceGroup
        label="Most people you can handle today"
        options={SOCIAL_OPTIONS}
        selected={filters.social}
        onSelect={(value) => updateFilter('social', value)}
      />

      <ChoiceGroup
        label="Budget"
        options={BUDGET_OPTIONS}
        selected={filters.cost}
        onSelect={(value) => updateFilter('cost', value)}
      />

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !ready }}
        disabled={!ready}
        onPress={() => {
          if (selectedMood !== null && ready) {
            onContinue(selectedMood, filters);
          }
        }}
        style={[
          styles.primaryButton,
          !ready && styles.primaryButtonDisabled,
        ]}
      >
        <Text
          style={[
            styles.primaryButtonText,
            !ready && styles.primaryButtonTextDisabled,
          ]}
        >
          Show me three missions
        </Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={onOpenProgress}
        style={styles.progressButton}
      >
        <Text style={styles.progressButtonText}>See my progress</Text>
      </Pressable>
    </ScrollView>
  );
}