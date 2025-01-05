import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RECENTLY_USED_REASONS = [
  { id: 1, name: 'Family' },
  { id: 2, name: 'Self esteem' },
  { id: 3, name: 'Sleep' },
  { id: 4, name: 'Social' },
];

const ALL_REASONS = [
  { id: 5, name: 'Work' },
  { id: 6, name: 'Hobbies' },
  { id: 7, name: 'Family' },
  { id: 8, name: 'Breakup' },
  { id: 9, name: 'Weather' },
  { id: 10, name: 'Wife' },
  { id: 11, name: 'Party' },
  { id: 12, name: 'Love' },
  { id: 13, name: 'Self esteem' },
  { id: 14, name: 'Sleep' },
  { id: 15, name: 'Social' },
  { id: 16, name: 'Food' },
  { id: 17, name: 'Distant' },
  { id: 18, name: 'Content' },
  { id: 19, name: 'Exams' },
];

export default function SelectReasons({ onClose, onContinue }) {
  const [selectedReasons, setSelectedReasons] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigation();

  const toggleReason = (reason) => {
    const newSelected = new Set(selectedReasons);
    if (newSelected.has(reason.id)) {
      newSelected.delete(reason.id);
    } else {
      newSelected.add(reason.id);
    }
    setSelectedReasons(newSelected);
  };

  const renderReasonChip = (reason) => {
    const isSelected = selectedReasons.has(reason.id);

    return (
      <TouchableOpacity
        key={reason.id}
        onPress={() => toggleReason(reason)}
        style={[styles.reasonChip, isSelected && styles.selectedReasonChip]}>
        <Text style={isSelected ? styles.selectedReasonText : styles.reasonText}>
          {reason.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerProgress}>3/4</Text>
        <TouchableOpacity onPress={onClose}>
          <Feather name="x" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>What’s reason making you feel this way?</Text>
      <Text style={styles.subtitle}>Select reasons that related your emotions</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search & add reasons"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666"
        />
      </View>

      {/* Selected Reasons */}
      {selectedReasons.size > 0 && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedTitle}>Selected ({selectedReasons.size})</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[...selectedReasons].map((id) => {
              const reason = [...RECENTLY_USED_REASONS, ...ALL_REASONS].find((r) => r.id === id);
              return (
                <View key={id} style={styles.selectedReasonChipSmall}>
                  <Text style={styles.selectedText}>{reason.name}</Text>
                  <TouchableOpacity onPress={() => toggleReason(reason)}>
                    <Feather name="x" size={16} color="#FFF" />
                  </TouchableOpacity>
                </View>
              );
            })}
            <TouchableOpacity onPress={() => setSelectedReasons(new Set())}>
              <Text style={styles.clearAllText}>Clear all</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      <ScrollView style={styles.content}>
        {/* Recently Used Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently used</Text>
          <View style={styles.reasonGrid}>{RECENTLY_USED_REASONS.map(renderReasonChip)}</View>
        </View>

        {/* All Reasons Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All reasons</Text>
          <View style={styles.reasonGrid}>{ALL_REASONS.map(renderReasonChip)}</View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <TouchableOpacity
        style={[styles.continueButton, selectedReasons.size === 0 && styles.continueButtonDisabled]}
        onPress={() => navigate.navigate('AddNotes')}
        disabled={selectedReasons.size === 0}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerProgress: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 40,
    marginTop: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 32,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  selectedContainer: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  selectedReasonChipSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7C4DFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  selectedText: {
    color: '#FFF',
    marginRight: 4,
  },
  clearAllText: {
    color: '#7C4DFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  reasonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  reasonChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#7C4DFF',
    marginBottom: 8,
  },
  reasonText: {
    fontSize: 14,
    color: '#7C4DFF',
  },
  selectedReasonChip: {
    backgroundColor: '#7C4DFF',
  },
  selectedReasonText: {
    fontSize: 14,
    color: '#FFF',
  },
  continueButton: {
    backgroundColor: '#7C4DFF',
    marginHorizontal: 20,
    marginVertical: 16,
    paddingVertical: 16,
    borderRadius: 100,
  },
  continueButtonDisabled: {
    backgroundColor: '#7C4DFF80',
  },
  continueText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
