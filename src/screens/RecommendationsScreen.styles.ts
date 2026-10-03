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
    marginBottom: 22,
  },
  card: {
    backgroundColor: '#F7F4EC',
    borderColor: 'rgba(38, 43, 34, 0.14)',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 14,
    padding: 18,
  },
  category: {
    color: '#3C4F40',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 5,
  },
  missionTitle: {
    color: '#262B22',
    fontSize: 19,
    fontWeight: '600',
    lineHeight: 25,
    marginBottom: 6,
  },
  description: {
    color: 'rgba(38, 43, 34, 0.62)',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  meta: {
    color: 'rgba(38, 43, 34, 0.62)',
    fontSize: 12,
  },
  empty: {
    backgroundColor: '#F7F4EC',
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
  },
  emptyTitle: {
    color: '#262B22',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 6,
  },
  emptyText: {
    color: 'rgba(38, 43, 34, 0.62)',
    fontSize: 14,
    lineHeight: 21,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
  },
  backText: {
    color: '#3C4F40',
    fontSize: 14,
    fontWeight: '700',
  },
});