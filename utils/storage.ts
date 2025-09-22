import AsyncStorage from '@react-native-async-storage/async-storage';

const SYMPTOMS_STORAGE_KEY = '@symptoms_data';
const WATER_QUALITY_STORAGE_KEY = '@water_quality_data';

interface StorageResponse {
  success: boolean;
  error?: string;
}

export const saveSymptomData = async (data: any): Promise<StorageResponse> => {
  try {
    // Read existing data
    let existingData: any[] = [];
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
    const newData = {
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
  } catch (error) {
    console.error('Error saving symptom data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save data'
    };
  }
};

export const saveWaterData = async (data: any): Promise<StorageResponse> => {
  try {
    // Read existing data
    let existingData: any[] = [];
    try {
      const storedData = await AsyncStorage.getItem(WATER_QUALITY_STORAGE_KEY);
      if (storedData) {
        existingData = JSON.parse(storedData);
      }
    } catch {
      // No existing data, start with empty array
      existingData = [];
    }

    // Add new data with timestamp
    const newData = {
      ...data,
      savedAt: new Date().toISOString(),
      id: `water_${Date.now()}`
    };
    existingData.push(newData);

    // Save back to storage
    await AsyncStorage.setItem(
      WATER_QUALITY_STORAGE_KEY,
      JSON.stringify(existingData, null, 2)
    );

    console.log('Water quality data saved successfully');
    return { success: true };
  } catch (error) {
    console.error('Error saving water quality data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save data'
    };
  }
};

// Utility function to read saved data (for verification)
export const readSavedData = async (type: 'symptoms' | 'water'): Promise<any[]> => {
  try {
    const key = type === 'symptoms' ? SYMPTOMS_STORAGE_KEY : WATER_QUALITY_STORAGE_KEY;
    const storedData = await AsyncStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.log(`No saved ${type} data found:`, error);
    return [];
  }
};

// Utility function to view all saved data in console (for debugging)
export const debugShowAllData = async () => {
  try {
    const symptomsData = await readSavedData('symptoms');
    const waterData = await readSavedData('water');
    
    console.log('=== Stored Symptoms Data ===');
    console.log(JSON.stringify(symptomsData, null, 2));
    
    console.log('=== Stored Water Quality Data ===');
    console.log(JSON.stringify(waterData, null, 2));
  } catch (error) {
    console.error('Error reading debug data:', error);
  }
};