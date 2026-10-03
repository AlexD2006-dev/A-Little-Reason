import { Pressable, Text, View } from 'react-native';
import { styles } from './ChoiceGroup.styles';

type ChoiceValue = string | number;

type ChoiceGroupProps<Value extends ChoiceValue> = {
  label: string;
  options: readonly { value: Value; label: string }[];
  selected: Value | null;
  onSelect: (value: Value) => void;
};

export default function ChoiceGroup<Value extends ChoiceValue>({
  label,
  options,
  selected,
  onSelect,
}: ChoiceGroupProps<Value>) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.row}>
        {options.map((option) => {
          const isSelected = selected === option.value;

          return (
            <Pressable
              key={String(option.value)}
              accessibilityRole="button"
              accessibilityLabel={option.label}
              accessibilityState={{ selected: isSelected }}
              onPress={() => onSelect(option.value)}
              style={[styles.chip, isSelected && styles.chipSelected]}
            >
              <Text
                style={[
                  styles.chipText,
                  isSelected && styles.chipTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}