import { Ionicons } from '@expo/vector-icons';

export interface TutorialCategory {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
  color: string;
  bgColor: string;
  count: number;
}

export interface TutorialGuide {
  id: string;
  title: string;
  type: 'video' | 'article' | 'checklist';
  duration: string;
  category: string;
  isNew: boolean;
  icon: keyof typeof Ionicons.glyphMap;
}

export interface TutorialDetailModalProps {
  visible: boolean;
  guide: TutorialGuide | null;
  onClose: () => void;
  onBookmark?: (guide: TutorialGuide) => void;
  onShare?: (guide: TutorialGuide) => void;
  onDownload?: (guide: TutorialGuide) => void;
}
