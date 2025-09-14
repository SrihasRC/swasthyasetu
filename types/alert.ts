export interface Alert {
  id: string;
  title: string;
  description: string;
  location: string;
  timeAgo: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW' | 'RESOLVED';
  type: 'outbreak' | 'contamination' | 'notice' | 'weather';
  affectedCount?: number;
  isRead: boolean;
}

export type AlertAction = 'report' | 'emergency' | 'share';

export interface AlertDetailsModalProps {
  visible: boolean;
  alert: Alert | null;
  onClose: () => void;
}
