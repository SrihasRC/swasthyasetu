const API_BASE_URL = 'http://13.220.174.139:5000';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const submitSymptomsData = async (data: any): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/symptoms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return {
      success: response.ok,
      data: response.ok ? result : undefined,
      error: !response.ok ? result.error : undefined,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
};

export const submitWaterData = async (data: any): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/water-quality`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return {
      success: response.ok,
      data: response.ok ? result : undefined,
      error: !response.ok ? result.error : undefined,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
};