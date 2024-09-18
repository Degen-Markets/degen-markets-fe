export interface Activity {
  marketName: string;
  value: string;
  payout: string;
  imageUrl: string;
}

export interface ActivitiesProps {
  activities: Activity[];
}
