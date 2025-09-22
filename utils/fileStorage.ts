import AsyncStorage from '@react-native-async-storage/async-storage';

const SYMPTOMS_STORAGE_KEY = '@sih_symptoms_data';
const WATER_STORAGE_KEY = '@sih_water_data';

// Define types for our data structures
interface PatientDetail {
  age?: number;
  gender?: 'male' | 'female' | 'other';
  symptoms?: string[];
}

interface SymptomData {
  id?: string;
  village: string;
  householdId: string;
  patientCount: number;
  patientDetails?: PatientDetail[];
  symptoms: string[];
  onsetDate: string;
  severity: 'mild' | 'moderate' | 'severe' | '';
  notes?: string;
  photoUrls?: string[];
  gps?: {
    lat: number;
    lng: number;
  };
  reporterId?: string;
  reportDate?: string;
  language?: string;
  contactNumber?: string;
  savedAt?: string;
}

interface WaterData {
  id?: string;
  location: string;
  sourceType: string;
  coordinates?: string;
  collectorName: string;
  collectionDate: string;
  pH: string;
  turbidity: string;
  chlorine: string;
  bacteria: string;
  heavyMetals?: string;
  smell: string;
  color: string;
  taste: string;
  notes?: string;
  savedAt?: string;
}

interface StorageResponse {
  success: boolean;
  error?: string;
}

export const saveSymptomData = async (data: SymptomData): Promise<StorageResponse> => {
  try {
    // Read existing data
    let existingData: SymptomData[] = [];
    try {
      const storedData = await AsyncStorage.getItem(SYMPTOMS_STORAGE_KEY);
      if (storedData) {
        existingData = JSON.parse(storedData);
      }
    } catch {
      // No existing data, start with empty array
      existingData = [];
    }

    // Add new data with timestamp
    const newData: SymptomData = {
      ...data,
      savedAt: new Date().toISOString(),
      id: `symptom_${Date.now()}`
    };
    existingData.push(newData);

    // Save back to storage
    await AsyncStorage.setItem(
      SYMPTOMS_STORAGE_KEY,
      JSON.stringify(existingData, null, 2)
    );

    console.log('Symptom data saved successfully');
    return { success: true };
  } catch (err) {
    console.error('Error saving symptom data:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to save data'
    };
  }
};

export const saveWaterData = async (data: WaterData): Promise<StorageResponse> => {
  try {
    // Read existing data
    let existingData: WaterData[] = [];
    try {
      const storedData = await AsyncStorage.getItem(WATER_STORAGE_KEY);
      if (storedData) {
        existingData = JSON.parse(storedData);
      }
    } catch {
      // No existing data, start with empty array
      existingData = [];
    }

    // Add new data with timestamp
    const newData: WaterData = {
      ...data,
      savedAt: new Date().toISOString(),
      id: `water_${Date.now()}`
    };
    existingData.push(newData);

    // Save back to storage
    await AsyncStorage.setItem(
      WATER_STORAGE_KEY,
      JSON.stringify(existingData, null, 2)
    );

    console.log('Water quality data saved successfully');
    return { success: true };
  } catch (err) {
    console.error('Error saving water quality data:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to save data'
    };
  }
};

// Utility function to read saved data (for verification)
export const readSavedData = async <T extends SymptomData | WaterData>(
  type: 'symptoms' | 'water'
): Promise<T[]> => {
  try {
    const key = type === 'symptoms' ? SYMPTOMS_STORAGE_KEY : WATER_STORAGE_KEY;
    const storedData = await AsyncStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : [];
  } catch (err) {
    console.log(`No saved ${type} data found:`, err);
    return [];
  }
};