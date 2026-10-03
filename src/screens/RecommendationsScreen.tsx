import { Pressable, ScrollView, Text, View } from 'react-native';
import type { Mission, SocialLimit } from '../types/mission';
import { styles } from './RecommendationsScreen.styles';

type RecommendationsScreenProps = {
  missions: Mission[];
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
  onPick,
  onBack,
}: RecommendationsScreenProps) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Three small options</Text>
      <Text style={styles.sub}>
        No wrong pick. Choose whichever one you would actually do.
      </Text>

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