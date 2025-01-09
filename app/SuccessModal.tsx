import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SuccessModal({ visible }) {
  const navigate = useNavigation();
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={() => {}}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Emoji Central */}
          <View style={styles.emojiBackground}>
            <Image source={require('assets/heart-eyes-emoji.png')} style={styles.emojiImage} />
          </View>

          {/* Texto de Sucesso */}
          <Text style={styles.successTitle}>
            You’re on a <Text style={styles.highlight}>good way!</Text>
          </Text>
          <Text style={styles.successTitle}>
            Your day is going <Text style={styles.highlight}>amazing</Text>
          </Text>
          <Text style={styles.subtitle}>
            Keep tracking your mood to know how to improve your mental health.
          </Text>

          {/* Botão "Got it" */}
          <TouchableOpacity style={styles.button} onPress={() => navigate.navigate('(tabs)')}>
            <Text style={styles.buttonText}>Got it</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    width: '90%',
  },
  emojiBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FDE7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emojiImage: {
    width: 80,
    height: 80,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
    marginBottom: 8,
  },
  highlight: {
    color: '#7C4DFF',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#7C4DFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 32,
    marginTop: 16,
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
