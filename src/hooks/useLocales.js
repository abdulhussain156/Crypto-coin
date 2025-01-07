import { useTranslation } from 'react-i18next';
// @mui
import { enUS, itIT } from '@mui/material/locale'; // Corrected import for Italian locale

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/icons/ic_english.svg',
  },
  {
    label: 'Italian',
    value: 'it',
    systemValue: itIT, // Corrected locale for Italian
    icon: '/icons/ic_italy.svg', // Updated icon for Italian
  },
];

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();
  const langStorage = localStorage.getItem('i18nextLng');
  const currentLang = LANGS.find((_lang) => _lang.value === langStorage) || LANGS[1];

  const handleChangeLanguage = (newLang) => {
    i18n.changeLanguage(newLang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS,
  };
}
