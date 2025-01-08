import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useStore } from 'store';

// Todos os ícones mapeados
const ALL_EMOTIONS = [
  { id: 1, image: require('assets/icons/angry-face-with-horns.png'), name: 'Angry' },
  { id: 2, image: require('assets/icons/anxious-face-with-sweat.png'), name: 'Anxious' },
  { id: 3, image: require('assets/icons/confused-face.png'), name: 'Confused' },
  { id: 4, image: require('assets/icons/disappointed-face.png'), name: 'Disappointed' },
  { id: 5, image: require('assets/icons/face-screaming-in-fear.png'), name: 'Fear' },
  { id: 6, image: require('assets/icons/face-with-steam-from-nose.png'), name: 'Frustrated' },
  { id: 7, image: require('assets/icons/face-with-tears-of-joy.png'), name: 'Happy' },
  { id: 8, image: require('assets/icons/grinning-face-with-sweat-2.png'), name: 'Nervous' },
  { id: 9, image: require('assets/icons/grinning-face-with-sweat.png'), name: 'Awkward' },
  { id: 10, image: require('assets/icons/hot-face.png'), name: 'Overwhelmed' },
  { id: 11, image: require('assets/icons/hugging-face.png'), name: 'Warm' },
  { id: 12, image: require('assets/icons/nauseated-face.png'), name: 'Nauseated' },
  { id: 13, image: require('assets/icons/neutral-face.png'), name: 'Neutral' },
  { id: 14, image: require('assets/icons/pouting-face.png'), name: 'Pouting' },
  { id: 15, image: require('assets/icons/smiling-face-with-halo.png'), name: 'Innocent' },
  { id: 16, image: require('assets/icons/smiling-face-with-heart-eyes.png'), name: 'In Love' },
  { id: 17, image: require('assets/icons/smiling-face-with-hearts.png'), name: 'Affectionate' },
  { id: 18, image: require('assets/icons/smiling-face.png'), name: 'Content' },
  { id: 19, image: require('assets/icons/star-struck.png'), name: 'Excited' },
  { id: 20, image: require('assets/icons/winking-face-with-tongue.png'), name: 'Playful' },
  { id: 21, image: require('assets/icons/woozy-face.png'), name: 'Dizzy' },
];

const RECENTLY_USED = [
  { id: 7, image: require('../assets/icons/face-with-tears-of-joy.png'), name: 'Happy' },
  { id: 19, image: require('../assets/icons/star-struck.png'), name: 'Excited' },
  { id: 11, image: require('../assets/icons/hugging-face.png'), name: 'Warm' },
  { id: 1, image: require('../assets/icons/angry-face-with-horns.png'), name: 'Angry' },
];

export default function SelectEmotions({ onClose, onContinue }) {
  const [selectedEmotions, setSelectedEmotions] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigation();
  const setEmotions = useStore((state) => state.setEmotions);

  const toggleEmotion = (emotion) => {
    const newSelected = new Set(selectedEmotions);
    if (newSelected.has(emotion.id)) {
      newSelected.delete(emotion.id);
    } else {
      newSelected.add(emotion.id);
    }
    setSelectedEmotions(newSelected);
  };

  const renderEmotionItem = (emotion) => {
    const isSelected = selectedEmotions.has(emotion.id);

    return (
      <TouchableOpacity
        key={emotion.id}
        onPress={() => toggleEmotion(emotion)}
        style={[styles.emotionItem, isSelected && styles.selectedEmotionItem]}>
        <View style={styles.emojiContainer}>
          <Image source={emotion.image} style={styles.emojiImage} />
        </View>
        <Text style={styles.emotionName}>{emotion.name}</Text>
      </TouchableOpacity>
    );
  };

  const handleContinue = () => {
    setEmotions([...selectedEmotions]);
    navigate.navigate('SelectReasons');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerProgress}>2/4</Text>
        <TouchableOpacity onPress={onClose}>
          <Feather name="x" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Choose the emotions that make you feel neutral</Text>
      <Text style={styles.subtitle}>Select at least 1 emotion</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search emotions"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666"
        />
      </View>

      {/* Selected Emotions */}
      {selectedEmotions.size > 0 && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedTitle}>Selected ({selectedEmotions.size})</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[...selectedEmotions].map((id) => {
              const emotion = [...RECENTLY_USED, ...ALL_EMOTIONS].find((e) => e.id === id);
              return (
                <View key={id} style={styles.selectedEmotionChip}>
                  <Text style={styles.selectedText}>{emotion.name}</Text>
                  <TouchableOpacity onPress={() => toggleEmotion(emotion)}>
                    <Feather name="x" size={16} color="#FFF" />
                  </TouchableOpacity>
                </View>
              );
            })}
            <TouchableOpacity onPress={() => setSelectedEmotions(new Set())}>
              <Text style={styles.clearAllText}>Clear all</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      <ScrollView style={styles.content}>
        {/* Recently Used Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently used</Text>
          <View style={styles.emotionsGrid}>{RECENTLY_USED.map(renderEmotionItem)}</View>
        </View>

        {/* All Emotions Section */}
        <View style={[styles.section, styles.allEmotionsSection]}>
          <Text style={styles.sectionTitle}>All emotions</Text>
          <View style={styles.emotionsGrid}>{ALL_EMOTIONS.map(renderEmotionItem)}</View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          selectedEmotions.size === 0 && styles.continueButtonDisabled,
        ]}
        onPress={handleContinue}
        disabled={selectedEmotions.size === 0}>
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
  selectedEmotionChip: {
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
  emotionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  emotionItem: {
    width: '22%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedEmotionItem: {
    backgroundColor: '#E3D6FF',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#7C4DFF',
  },
  emojiImage: {
    width: '60%',
    height: '60%',
  },
  emotionName: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
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
  allEmotionsSection: {
    marginTop: 55,
  },
});
