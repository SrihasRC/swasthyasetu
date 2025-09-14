import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Dimensions,
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAppTheme } from '../../components/ThemeProvider';
import { getAvailableLanguages, Language, useLanguage } from '../contexts/LanguageContext';

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ visible, onClose }) => {
  const { colors } = useAppTheme();
  const { language, changeLanguage, t } = useLanguage();
  const availableLanguages = getAvailableLanguages();

  const handleLanguageSelect = async (languageCode: Language) => {
    await changeLanguage(languageCode);
    onClose();
  };

  const renderLanguageItem = ({ item }: { item: typeof availableLanguages[0] }) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        { backgroundColor: colors.card },
        item.code === language && { backgroundColor: colors.primary + '20' }
      ]}
      onPress={() => handleLanguageSelect(item.code)}
      activeOpacity={0.7}
    >
      <View style={styles.languageInfo}>
        <Text style={[styles.languageName, { color: colors.foreground }]}>
          {item.name}
        </Text>
        <Text style={[styles.nativeName, { color: colors.mutedForeground }]}>
          {item.nativeName}
        </Text>
      </View>
      {item.code === language && (
        <Ionicons
          name="checkmark-circle"
          size={24}
          color={colors.primary}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <Text style={[styles.title, { color: colors.foreground }]}>
              {t('language.title')}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.foreground} />
            </TouchableOpacity>
          </View>

          {/* Subtitle */}
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            {t('language.subtitle')}
          </Text>

          {/* Language List */}
          <FlatList
            data={availableLanguages}
            renderItem={renderLanguageItem}
            keyExtractor={(item) => item.code}
            style={styles.languageList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    maxHeight: Dimensions.get('window').height * 0.6,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34, // Safe area bottom
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  subtitle: {
    fontSize: 14,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  languageList: {
    paddingHorizontal: 20,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  nativeName: {
    fontSize: 14,
  },
});

export default LanguageSelector;
