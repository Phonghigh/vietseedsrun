import { apiClient } from './client';
import { challengeGoal } from '@/lib/mockData';

export interface CampaignStats {
  targetKm: number;
  currentKm: number;
  totalRunners: number;
  totalActivities: number;
}

export const getCampaignStats = async (): Promise<CampaignStats> => {
  try {
    const response = await apiClient.get<CampaignStats>('/campaign/stats');
    return response.data;
  } catch (error) {
    console.warn('API Error, falling back to Mock Campaign Data');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          targetKm: challengeGoal.targetKm,
          currentKm: challengeGoal.currentKm,
          totalRunners: 1250,
          totalActivities: 5430
        });
      }, 800);
    });
  }
};
