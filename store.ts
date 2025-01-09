import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = create((set, get) => ({
  mood: null,
  emotions: [],
  reasons: [],
  note: '',
  setMood: (mood) => set({ mood }),
  setEmotions: (emotions) => set({ emotions }),
  setReasons: (reasons) => set({ reasons }),
  setNote: (note) => set({ note }),

  // Função para salvar os dados do dia
  saveDayData: async () => {
    const state = get();
    const currentDate = new Date().toISOString().split('T')[0]; // Data formatada (YYYY-MM-DD)
    const newEntry = {
      mood: {
        id: state.mood.id, // Salvar o ID do emoji
        image: state.mood.image,
      },
      emotions: state.emotions,
      reasons: state.reasons,
      note: state.note,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    let storedData = await AsyncStorage.getItem('dayData');
    storedData = storedData ? JSON.parse(storedData) : {};

    if (!storedData[currentDate]) {
      storedData[currentDate] = [];
    }
    storedData[currentDate].push(newEntry);

    await AsyncStorage.setItem('dayData', JSON.stringify(storedData));
  },
}));

export { useStore };
