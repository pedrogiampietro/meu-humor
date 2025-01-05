import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const MOODS = [
  { id: 1, image: require('assets/icons/pouting-face.png'), name: 'Angry', bgColor: '#FF6B6B' },
  { id: 2, image: require('assets/icons/disappointed-face.png'), name: 'Sad', bgColor: '#5DADE2' },
  { id: 3, image: require('assets/icons/neutral-face.png'), name: 'Neutral', bgColor: '#F4D03F' },
  {
    id: 4,
    image: require('assets/icons/smiling-face-with-heart-eyes.png'),
    name: 'Happy',
    bgColor: '#58D68D',
  },
  {
    id: 5,
    image: require('assets/icons/smiling-face-with-hearts.png'),
    name: 'Very Happy',
    bgColor: '#AF7AC5',
  },
];

const SMALL_EMOJI_SIZE = 40;
const LARGE_EMOJI_SIZE = 60;
const CENTER_INDEX = 2; // Índice do meio (considerando 5 emojis)

export default function AddMood() {
  const [moodsOrder, setMoodsOrder] = useState(MOODS);

  const navigation = useNavigation();

  const handleMoodSelect = (mood, currentIndex) => {
    if (currentIndex !== CENTER_INDEX) {
      const newOrder = [...moodsOrder];
      const selectedMood = newOrder[currentIndex];

      newOrder.splice(currentIndex, 1);

      const leftSide = newOrder.slice(0, CENTER_INDEX);
      const rightSide = newOrder.slice(CENTER_INDEX);

      const reorderedMoods = [...leftSide, selectedMood, ...rightSide];
      setMoodsOrder(reorderedMoods);
    }
  };

  const renderMoodItem = (mood, index) => {
    const isCenter = index === CENTER_INDEX;
    const size = isCenter ? LARGE_EMOJI_SIZE : SMALL_EMOJI_SIZE;

    return (
      <TouchableOpacity
        key={mood.id}
        onPress={() => handleMoodSelect(mood, index)}
        style={[
          styles.moodItem,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: isCenter ? mood.bgColor : '#FFF',
            transform: [{ scale: isCenter ? 1.2 : 1 }],
          },
        ]}>
        <Image
          source={mood.image}
          style={[styles.moodImage, { width: size * 0.8, height: size * 0.8 }]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={['#F8F9FF', '#F1F3FF']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Sun, 4 Jun</Text>
          <Feather name="calendar" size={20} color="#7C4DFF" style={styles.calendarIcon} />
        </View>
        <Text style={styles.progressText}>1/4</Text>
        <TouchableOpacity style={styles.closeButton}>
          <Feather name="x" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>What's your mood now?</Text>
        <Text style={styles.subtitle}>
          Select mood that reflects the most how you are feeling at this moment.
        </Text>
      </View>

      <View style={styles.moodContainer}>
        <ImageBackground source={require('assets/cloud-bg.png')} style={styles.cloudBackground}>
          <View style={styles.moodsRow}>
            {moodsOrder.map((mood, index) => renderMoodItem(mood, index))}
          </View>
        </ImageBackground>
        <Text style={styles.moodName}>{moodsOrder[CENTER_INDEX].name}</Text>
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('SelectEmotions')}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  moodContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cloudBackground: {
    width: 526,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  moodItem: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  moodImage: {
    resizeMode: 'contain',
  },
  moodName: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
  continueButton: {
    backgroundColor: '#7C4DFF',
    marginHorizontal: 20,
    marginBottom: 40,
    paddingVertical: 16,
    borderRadius: 30,
  },
  continueText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
