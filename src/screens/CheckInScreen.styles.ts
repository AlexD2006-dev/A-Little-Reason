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
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingBottom: 14,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(38, 43, 34, 0.14)',
  },
  wordmark: {
    color: '#262B22',
    fontSize: 20,
    fontWeight: '600',
  },
  wordmarkEm: {
    color: '#55705C',
    fontStyle: 'italic',
  },
  stepTag: {
    color: 'rgba(38, 43, 34, 0.62)',
    fontSize: 12,
  },
  headline: {
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
});