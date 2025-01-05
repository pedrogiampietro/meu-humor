import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DayItem = ({ day, date, isSelected, emoji }) => (
  <TouchableOpacity style={[styles.dayItem, isSelected && styles.selectedDay]}>
    <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{day}</Text>
    <Text style={[styles.dateText, isSelected && styles.selectedDayText]}>{date}</Text>
    <Text style={styles.emoji}>{emoji}</Text>
  </TouchableOpacity>
);

const MoodBar = ({ height, time, emoji }) => (
  <View style={styles.moodBarContainer}>
    <View style={[styles.moodBar, { height }]}>
      <Text style={styles.moodEmoji}>{emoji}</Text>
    </View>
    <Text style={styles.moodTime}>{time}</Text>
  </View>
);

export default function App() {
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
          <DayItem day="Thu" date="1" emoji="😊" />
          <DayItem day="Fri" date="2" emoji="🙂" />
          <DayItem day="Sat" date="3" emoji="😡" />
          <DayItem day="Sun" date="4" emoji="😍" isSelected={true} />
          <DayItem day="Mon" date="5" emoji="" />
          <DayItem day="Tue" date="6" emoji="" />
          <DayItem day="Wed" date="7" emoji="" />
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
            <MoodBar height={120} time="10:08" emoji="😍" />
            <MoodBar height={20} time="12:10" emoji="😡" />
            <MoodBar height={60} time="14:40" emoji="🙂" />
            <MoodBar height={40} time="18:30" emoji="😔" />
            <MoodBar height={20} time="20:10" emoji="😡" />
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
  emoji: {
    fontSize: 16,
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
  moodEmoji: {
    fontSize: 16,
  },
  moodTime: {
    fontSize: 12,
    marginTop: 5,
    color: '#666',
  },
});
