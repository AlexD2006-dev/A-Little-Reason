import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  field: {
    marginBottom: 20,
  },
  label: {
    color: '#262B22',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: 'rgba(38, 43, 34, 0.28)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  chipSelected: {
    backgroundColor: '#55705C',
    borderColor: '#55705C',
  },
  chipText: {
    color: '#262B22',
    fontSize: 14,
  },
  chipTextSelected: {
    color: '#F7F4EC',
  },
});