import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mapeamento dos ícones de humor para os arquivos de imagem
export const emojiMap = {
  1: require('assets/icons/angry-face-with-horns.png'),
  2: require('assets/icons/anxious-face-with-sweat.png'),
  3: require('assets/icons/confused-face.png'),
  4: require('assets/icons/disappointed-face.png'),
  5: require('assets/icons/face-screaming-in-fear.png'),
  6: require('assets/icons/face-with-steam-from-nose.png'),
  7: require('assets/icons/face-with-tears-of-joy.png'),
  8: require('assets/icons/grinning-face-with-sweat-2.png'),
  9: require('assets/icons/grinning-face-with-sweat.png'),
  10: require('assets/icons/hot-face.png'),
  11: require('assets/icons/hugging-face.png'),
  12: require('assets/icons/nauseated-face.png'),
  13: require('assets/icons/neutral-face.png'),
  14: require('assets/icons/pouting-face.png'),
  15: require('assets/icons/smiling-face-with-halo.png'),
  16: require('assets/icons/smiling-face-with-heart-eyes.png'),
  17: require('assets/icons/smiling-face-with-hearts.png'),
  18: require('assets/icons/smiling-face.png'),
  19: require('assets/icons/star-struck.png'),
  20: require('assets/icons/winking-face-with-tongue.png'),
  21: require('assets/icons/woozy-face.png'),
};

// Componente DayItem
const DayItem = ({ day, date, isSelected, emoji }) => (
  <TouchableOpacity style={[styles.dayItem, isSelected && styles.selectedDay]}>
    <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{day}</Text>
    <Text style={[styles.dateText, isSelected && styles.selectedDayText]}>{date}</Text>
    {emoji ? (
      <Image source={emoji} style={styles.emojiImage} />
    ) : (
      <Text style={styles.noEmojiText}>-</Text> // Placeholder caso não haja emoji
    )}
  </TouchableOpacity>
);

// Componente MoodBar
const MoodBar = ({ height, time, emoji }) => (
  <View style={styles.moodBarContainer}>
    <View style={[styles.moodBar, { height }]}>
      {emoji ? <Image source={emoji} style={styles.emojiImage} /> : null}
    </View>
    <Text style={styles.moodTime}>{time}</Text>
  </View>
);

// Função para obter a semana atual
const getCurrentWeek = () => {
  const currentDate = new Date();
  const startOfWeek = currentDate.getDate() - currentDate.getDay();
  const week = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate.setDate(startOfWeek + i));
    week.push({
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      emoji: null, // Inicialmente sem emoji
    });
  }

  return week;
};

// Componente principal App
export default function App() {
  const [dayData, setDayData] = useState(null);
  const [weekData, setWeekData] = useState(getCurrentWeek());

  useEffect(() => {
    const fetchDayData = async () => {
      const data = await AsyncStorage.getItem('dayData');

      console.log('data ->', data);

      if (data) {
        const parsedData = JSON.parse(data);
        setDayData(parsedData);

        const updatedWeekData = weekData.map((day) => {
          if (day.date === new Date(parsedData.date).getDate()) {
            const moodEmoji = emojiMap[parsedData.mood.image] || emojiMap[13]; // Emoji neutro como fallback
            return { ...day, emoji: moodEmoji };
          }
          return day;
        });

        setWeekData(updatedWeekData);
      }
    };

    fetchDayData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hey, Alexa! 👋</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.currentDate}>Sun, 4 Jun</Text>
            <Text style={styles.streak}>🔥 5</Text>
          </View>
        </View>

        {/* Calendar */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.calendar}>
          {weekData.map((day, index) => (
            <DayItem
              key={index}
              day={day.day}
              date={day.date}
              emoji={day.emoji}
              isSelected={day.date === new Date().getDate()}
            />
          ))}
        </ScrollView>

        {/* Check-in Card */}
        <View style={styles.checkInCard}>
          <View style={styles.checkInHeader}>
            <View style={styles.checkInTitleContainer}>
              <Text style={styles.starEmoji}>⭐</Text>
              <Text style={styles.checkInTitle}>Check-in</Text>
            </View>
            <Text style={styles.checkInProgress}>3/3 🔥</Text>
          </View>
        </View>

        {/* Mood Chart */}
        <View style={styles.moodChartContainer}>
          <Text style={styles.moodChartTitle}>Mood chart</Text>
          <View style={styles.moodChart}>
            {dayData &&
              dayData.moodChart &&
              dayData.moodChart.map((mood, index) => (
                <MoodBar
                  key={index}
                  height={mood.height}
                  time={mood.time}
                  emoji={emojiMap[dayData.mood.image] || emojiMap[13]} // Emoji neutro como fallback
                />
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  currentDate: {
    marginRight: 10,
  },
  streak: {
    fontSize: 16,
  },
  calendar: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dayItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 25,
    marginRight: 10,
    width: 60,
  },
  selectedDay: {
    backgroundColor: '#7C4DFF',
  },
  dayText: {
    fontSize: 12,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  selectedDayText: {
    color: 'white',
  },
  emojiImage: {
    width: 32,
    height: 32,
    marginTop: 8,
    resizeMode: 'contain',
  },
  noEmojiText: {
    fontSize: 16,
    color: '#aaa',
  },
  checkInCard: {
    backgroundColor: '#FFE4E4',
    margin: 20,
    padding: 15,
    borderRadius: 15,
  },
  checkInHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkInTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starEmoji: {
    marginRight: 8,
  },
  checkInTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  checkInProgress: {
    fontSize: 16,
  },
  moodChartContainer: {
    backgroundColor: '#F0EEFF',
    margin: 20,
    padding: 20,
    borderRadius: 15,
  },
  moodChartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  moodChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 150,
    alignItems: 'flex-end',
  },
  moodBarContainer: {
    alignItems: 'center',
    flex: 1,
  },
  moodBar: {
    width: 40,
    backgroundColor: '#7C4DFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 5,
  },
  moodTime: {
    fontSize: 12,
    marginTop: 5,
    color: '#666',
  },
});
