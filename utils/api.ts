// Use HTTPS in production
const API_BASE_URL = 'http://13.220.174.139:5000';

// Timeout duration in milliseconds (15 seconds)
const TIMEOUT_DURATION = 15000;

// Debug flag - set to true to enable detailed logging
const DEBUG = true;

// Function to handle fetch with timeout and debug logging
const fetchWithTimeout = async (url: string, options: RequestInit): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

  if (DEBUG) {
    console.log('Making API request to:', url);
    console.log('Request options:', JSON.stringify(options, null, 2));
  }

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (DEBUG) {
      console.log('Response status:', response.status);
      console.log('Response headers:', JSON.stringify([...response.headers.entries()], null, 2));
      if (!response.ok) {
        console.warn('Request failed with status:', response.status);
        const responseText = await response.text();
        console.warn('Response body:', responseText);
        // Create a new response since we consumed the body
        return new Response(responseText, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      }
    }
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const submitSymptomsData = async (data: any): Promise<ApiResponse<any>> => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/api/symptoms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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
    const errorMessage = error instanceof Error 
      ? (error.name === 'AbortError' 
          ? 'Request timed out. Please check your internet connection.' 
          : error.message)
      : 'Network error occurred';
    
    console.error('API Error:', error);
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const submitWaterData = async (data: any): Promise<ApiResponse<any>> => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/api/water-quality`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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
    const errorMessage = error instanceof Error 
      ? (error.name === 'AbortError' 
          ? 'Request timed out. Please check your internet connection.' 
          : error.message)
      : 'Network error occurred';
    
    console.error('API Error:', error);
    return {
      success: false,
      error: errorMessage,
    };
  }
};

// Function to test API connectivity
export const testApiConnection = async (): Promise<boolean> => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    return response.ok;
  } catch (error) {
    console.error('API Connection Test Failed:', error);
    return false;
  }
};