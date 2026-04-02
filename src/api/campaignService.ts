import { apiClient } from './client';

export interface CampaignStats {
  targetKm: number;
  currentKm: number;
  totalRunners: number;
  totalActivities: number;
}

const CHALLENGE_START = '2026-04-01T00:00:00Z';
const CHALLENGE_END = '2026-04-30T23:59:59Z';

export const getCampaignStats = async (): Promise<CampaignStats> => {
  const response = await apiClient.get<CampaignStats>('/campaign/stats', {
    params: { startDate: CHALLENGE_START, endDate: CHALLENGE_END }
  });
  return response.data;
};
