import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = create((set) => ({
  mood: null,
  emotions: [],
  reasons: [],
  note: '',
  setMood: (mood) => set({ mood }),
  setEmotions: (emotions) => set({ emotions }),
  setReasons: (reasons) => set({ reasons }),
  setNote: (note) => set({ note }),
  saveDayData: async () => {
    set((state) => {
      const currentDate = new Date();
      const dayData = {
        mood: state.mood,
        emotions: state.emotions,
        reasons: state.reasons,
        note: state.note,
        date: currentDate.toISOString(),
        moodChart: [
          {
            height: 100, // Exemplo de altura, pode ser ajustado conforme necessário
            time: currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            emoji: state.mood.emoji,
          },
        ],
      };
      AsyncStorage.setItem('dayData', JSON.stringify(dayData));
      return state;
    });
  },
}));

export { useStore };
