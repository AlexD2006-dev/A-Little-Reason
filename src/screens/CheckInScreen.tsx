import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { styles } from './CheckInScreen.styles';

const moods = [
  { emoji: '😔', label: 'low' },
  { emoji: '😕', label: 'flat' },
  { emoji: '😐', label: 'okay' },
  { emoji: '🙂', label: 'good' },
  { emoji: '😊', label: 'great' },
];

export default function CheckInScreen() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

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
        Answer honestly. This is about what feels realistic today, not what feels ambitious.
      </Text>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Current mood</Text>

        <View style={styles.moodRow}>
          {moods.map((mood, index) => (
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
    </ScrollView>
  );
}