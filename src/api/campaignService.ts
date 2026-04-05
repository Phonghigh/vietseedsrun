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
  try {
    const response = await apiClient.get<any>('/campaign/heatmap', {
      params: { startDate: CHALLENGE_START, endDate: CHALLENGE_END }
    });
    
    const rawData = response.data;
    console.log("[Heatmap API] Raw Response Data:", rawData);

    if (!rawData) {
      console.warn("[Heatmap API] No data in response.");
      return [];
    }

    // Check if it's already an array
    if (Array.isArray(rawData)) {
      console.log("[Heatmap API] Success: Data is already an array.");
      return rawData;
    }

    // Handle nested "data" property or the root object
    const data = rawData.data || rawData;

    if (data && typeof data === 'object') {
      // If it's the { members: {}, activities: {} } format
      if (data.members || data.activities) {
        const members = data.members || {};
        const activities = data.activities || {};
        const allProvinces = Array.from(new Set([...Object.keys(members), ...Object.keys(activities)]));
        
        const transformed = allProvinces.map(province => ({
          province,
          members: Number(members[province] || 0),
          activities: Number(activities[province] || 0)
        }));
        console.log("[Heatmap API] Transformed Object to heatmap array:", transformed);
        return transformed;
      }
      
      // If it's an object where keys are provinces and values are objects
      // Example: { "Hồ Chí Minh": { members: 32, activities: 270.3 }, ... }
      const keys = Object.keys(data).filter(k => k !== 'data' && k !== 'success');
      if (keys.length > 0 && typeof data[keys[0]] === 'object') {
         const transformedFromKeys = keys.map(k => ({
            province: k,
            members: Number(data[k].members || 0),
            activities: Number(data[k].activities || 0)
         }));
         console.log("[Heatmap API] Transformed via Keys:", transformedFromKeys);
         return transformedFromKeys;
      }
    }

    console.warn("[Heatmap API] Could not transform data into expected format. Data:", data);
    return [];
  } catch (error) {
    console.error("[Heatmap API] Error fetching/transforming heatmap:", error);
    return [];
  }
};
