import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { MOOD_OPTIONS } from '../data/checkInOptions';
import type { Mission } from '../types/mission';
import { styles } from './CompletionScreen.styles';

type CompletionScreenProps = {
  mission: Mission;
  moodBefore: number;
  onSave: (moodAfter: number, reflection: string) => void;
};

export default function CompletionScreen({
  mission,
  moodBefore,
  onSave,
}: CompletionScreenProps) {
  const [moodAfter, setMoodAfter] = useState<number | null>(null);
  const [reflection, setReflection] = useState('');

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>How do you feel now?</Text>
      <Text style={styles.sub}>
        You just did: {mission.title}. There is no pressure to feel a big shift.
      </Text>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Mood now</Text>

        <View style={styles.moodRow}>
          {MOOD_OPTIONS.map((mood, index) => (
            <Pressable
              key={mood.label}
              accessibilityRole="button"
              accessibilityLabel={`${mood.label} mood`}
              accessibilityState={{ selected: moodAfter === index }}
              onPress={() => setMoodAfter(index)}
              style={[
                styles.moodButton,
                moodAfter === index && styles.moodButtonSelected,
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

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Private reflection (optional)</Text>
        <TextInput
          accessibilityLabel="Private reflection"
          multiline
          onChangeText={setReflection}
          placeholder="Anything worth remembering about this one..."
          placeholderTextColor="rgba(38, 43, 34, 0.5)"
          style={styles.reflection}
          value={reflection}
        />
      </View>

      <Pressable
        accessibilityRole="button"
        disabled={moodAfter === null}
        onPress={() => {
          if (moodAfter !== null) {
            onSave(moodAfter, reflection.trim());
          }
        }}
        style={[
          styles.primaryButton,
          moodAfter === null && styles.primaryButtonDisabled,
        ]}
      >
        <Text style={styles.primaryButtonText}>Save to my progress</Text>
      </Pressable>
    </ScrollView>
  );
}