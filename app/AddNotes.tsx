import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import SuccessModal from './SuccessModal';
import { useStore } from '../store';

export default function AddNotes() {
  const [note, setNote] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const setNoteInStore = useStore((state) => state.setNote);
  const saveDayData = useStore((state) => state.saveDayData);

  const onClose = () => {
    Alert.alert('Close', 'The notes screen was closed.');
  };

  const onSave = () => {
    if (note.trim()) {
      setNoteInStore(note);
      saveDayData();
      setShowSuccessModal(true);
    } else {
      Alert.alert('Note is empty', 'Please write something before saving.');
    }
  };

  const onRecordVoiceNote = () => {
    Alert.alert('Recording', 'Voice note recording started...');
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerProgress}>4/4</Text>
        <TouchableOpacity onPress={onClose}>
          <Feather name="x" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Title and Subtitle */}
      <Text style={styles.title}>Anything you want to add</Text>
      <Text style={styles.subtitle}>Add your notes on any thought that relates to your mood</Text>

      {/* Note Input */}
      <View style={styles.noteContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Write your thoughts here..."
          placeholderTextColor="#AAA"
          value={note}
          onChangeText={setNote}
          multiline
        />
        <TouchableOpacity style={styles.microphoneIcon} onPress={onRecordVoiceNote}>
          <Feather name="mic" size={20} color="#7C4DFF" />
        </TouchableOpacity>
      </View>

      {/* Record Voice Note */}
      <TouchableOpacity style={styles.voiceNoteButton} onPress={onRecordVoiceNote}>
        <Feather name="mic" size={20} color="#FFF" />
        <Text style={styles.voiceNoteText}>Record voice note</Text>
      </TouchableOpacity>

      {/* Save and Skip Buttons */}
      <TouchableOpacity
        style={[styles.saveButton, !note && styles.saveButtonDisabled]}
        onPress={onSave}
        disabled={!note}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.skipButton} onPress={onSave}>
        <Text style={styles.skipText}>Skip and Save</Text>
      </TouchableOpacity>

      <SuccessModal visible={showSuccessModal} onClose={handleCloseModal} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginTop: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  noteContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 24,
  },
  textInput: {
    fontSize: 16,
    color: '#000',
    textAlignVertical: 'top',
    flex: 1,
  },
  microphoneIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  voiceNoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C4DFF',
    borderRadius: 32,
    paddingVertical: 12,
    marginBottom: 24,
  },
  voiceNoteText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: '#7C4DFF',
    borderRadius: 32,
    paddingVertical: 16,
    marginBottom: 16,
  },
  saveButtonDisabled: {
    backgroundColor: '#7C4DFF80',
  },
  saveText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  skipButton: {
    alignItems: 'center',
    marginBottom: 24,
  },
  skipText: {
    color: '#7C4DFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
