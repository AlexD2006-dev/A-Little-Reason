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
  category: {
    color: '#3C4F40',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  title: {
    color: '#262B22',
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 35,
    marginBottom: 8,
  },
  description: {
    color: 'rgba(38, 43, 34, 0.62)',
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 16,
  },
  meta: {
    color: 'rgba(38, 43, 34, 0.62)',
    fontSize: 12,
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#262B22',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  guideStep: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(38, 43, 34, 0.14)',
  },
  guideNumber: {
    color: '#3C4F40',
    fontSize: 15,
    fontWeight: '600',
    minWidth: 20,
  },
  guideText: {
    color: '#262B22',
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#55705C',
    borderRadius: 12,
    marginTop: 24,
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
  primaryButtonText: {
    color: '#F7F4EC',
    fontSize: 15,
    fontWeight: '700',
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 12,
  },
  backText: {
    color: '#3C4F40',
    fontSize: 14,
    fontWeight: '700',
  },
});