import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EEEBE2',
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 36,
  },
  title: {
    color: '#262B22',
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 35,
    marginBottom: 8,
  },
  sub: {
    color: 'rgba(38, 43, 34, 0.62)',
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 24,
  },
  field: {
    marginBottom: 22,
  },
  fieldLabel: {
    color: '#262B22',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  moodButton: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(38, 43, 34, 0.28)',
    borderRadius: 999,
    backgroundColor: '#F7F4EC',
  },
  moodButtonSelected: {
    borderColor: '#55705C',
    borderWidth: 2,
    backgroundColor: '#E4E9DE',
  },
  moodEmoji: {
    fontSize: 20,
  },
  moodLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  moodLabel: {
    color: 'rgba(38, 43, 34, 0.62)',
    fontSize: 11,
  },
  reflection: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: 'rgba(38, 43, 34, 0.28)',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#F7F4EC',
    color: '#262B22',
    fontSize: 14,
    textAlignVertical: 'top',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#55705C',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
  primaryButtonDisabled: {
    backgroundColor: 'rgba(38, 43, 34, 0.28)',
  },
  primaryButtonText: {
    color: '#F7F4EC',
    fontSize: 15,
    fontWeight: '700',
  },
});