// LanguageSwitcher.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'de', label: 'Deutsch' },
  { code: 'en', label: 'English' },
];

export function LanguageSwitcher() {
  const { i18n} = useTranslation();
  //const [lang, setLang] = useState(i18n.language.split('-')[0]);
  const [lang, setLang] = useState((i18n.language ?? 'en').split('-')[0]);
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };


  return (
    <>
      <label htmlFor="selectLanguage">&nbsp;Language: </label>
      <select id="selectLanguage" value={lang} onChange={handleChange}>
        {LANGUAGES.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
}