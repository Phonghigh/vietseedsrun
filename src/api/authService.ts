import { apiClient } from './client';

export interface UserProfile {
  id: string;
  stravaId: string;
  name: string;
  avatar: string;
  teamName: string;
  totalDistance?: number;
  totalActivities?: number;
  rank?: number;
  teamRank?: number;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}

export const getMyProfile = async (): Promise<UserProfile> => {
  const response = await apiClient.get<UserProfile>('/auth/me');
  return response.data;
};

export const exchangeStravaCode = async (code: string): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/strava/exchange', { code });
  return response.data;
};
