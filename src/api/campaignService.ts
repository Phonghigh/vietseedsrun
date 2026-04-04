import { apiClient } from './client';

export interface CampaignStats {
  targetKm: number;
  currentKm: number;
  totalRunners: number;
  totalActivities: number;
}

export interface CampaignTrendItem {
  date: string;
  km: number;
}

const CHALLENGE_START = '2026-04-01T00:00:00Z';
const CHALLENGE_END = '2026-04-30T23:59:59Z';

export interface HeatmapItem {
  province: string;
  members: number;
  activities: number;
}

export const getCampaignStats = async (): Promise<CampaignStats> => {
  const response = await apiClient.get<CampaignStats>('/campaign/stats', {
    params: { startDate: CHALLENGE_START, endDate: CHALLENGE_END }
  });
  return response.data;
};

export const getCampaignTrend = async (): Promise<CampaignTrendItem[]> => {
  const response = await apiClient.get<CampaignTrendItem[]>('/campaign/trend', {
    params: { startDate: CHALLENGE_START, endDate: CHALLENGE_END }
  });
  return response.data;
};

export const getCampaignHeatmap = async (): Promise<HeatmapItem[]> => {
  const response = await apiClient.get<HeatmapItem[]>('/campaign/heatmap', {
    params: { startDate: CHALLENGE_START, endDate: CHALLENGE_END }
  });
  return response.data;
};
