import { Pressable, ScrollView, Text, View } from 'react-native';
import type { Mission } from '../types/mission';
import { styles } from './MissionScreen.styles';

type MissionScreenProps = {
  mission: Mission;
  onComplete: () => void;
  onBack: () => void;
};

export default function MissionScreen({
  mission,
  onComplete,
  onBack,
}: MissionScreenProps) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.category}>{mission.category}</Text>
      <Text style={styles.title}>{mission.title}</Text>
      <Text style={styles.description}>{mission.description}</Text>
      <Text style={styles.meta}>
        About {mission.timeMinutes} min · {mission.setting} · social comfort {mission.social}/4
      </Text>

      <Text style={styles.sectionTitle}>How it goes</Text>

      {mission.guide.map((step, index) => (
        <View key={`${mission.id}-${index}`} style={styles.guideStep}>
          <Text style={styles.guideNumber}>{index + 1}</Text>
          <Text style={styles.guideText}>{step}</Text>
        </View>
      ))}

      <Pressable
        accessibilityRole="button"
        onPress={onComplete}
        style={styles.primaryButton}
      >
        <Text style={styles.primaryButtonText}>I did it — mark complete</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={onBack}
        style={styles.backButton}
      >
        <Text style={styles.backText}>‹ Back to options</Text>
      </Pressable>
    </ScrollView>
  );
}