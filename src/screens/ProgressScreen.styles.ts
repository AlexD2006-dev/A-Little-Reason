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
    alignItems: 'center',
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
  backButton: {
    borderWidth: 1,
    borderColor: 'rgba(38, 43, 34, 0.28)',
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 7,
  },
  backButtonText: {
    color: '#3C4F40',
    fontSize: 13,
    fontWeight: '700',
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
  statsGrid: {
    gap: 12,
    marginBottom: 28,
  },
  statRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F7F4EC',
    borderWidth: 1,
    borderColor: 'rgba(38, 43, 34, 0.14)',
    borderRadius: 14,
    padding: 16,
  },
  statNumber: {
    color: '#3C4F40',
    fontSize: 27,
    fontWeight: '600',
  },
  statLabel: {
    color: 'rgba(38, 43, 34, 0.62)',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
  },
  sectionTitle: {
    color: '#262B22',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptyState: {
    backgroundColor: '#F7F4EC',
    borderWidth: 1,
    borderColor: 'rgba(38, 43, 34, 0.14)',
    borderRadius: 14,
    padding: 18,
  },
  emptyTitle: {
    color: '#262B22',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  emptyText: {
    color: 'rgba(38, 43, 34, 0.62)',
    fontSize: 13,
    lineHeight: 19,
  },
  logEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(38, 43, 34, 0.14)',
  },
  logDetails: {
    flex: 1,
    paddingRight: 12,
  },
  logTitle: {
    color: '#262B22',
    fontSize: 14,
    fontWeight: '600',
  },
  logDate: {
    color: 'rgba(38, 43, 34, 0.62)',
    fontSize: 12,
    marginTop: 3,
  },
  moodPair: {
    minWidth: 72,
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  moodEmoji: {
    fontSize: 16,
    lineHeight: 22,
  },
  moodArrow: {
    color: '#3C4F40',
    fontSize: 15,
    lineHeight: 22,
  },
});