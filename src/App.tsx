import React, { useState } from 'react';
import TranslationForm from './components/TranslationForm';
import { translateText } from './lib/translate';

type Translation = {
  language: string;
  text: string;
};

type Metadata = {
  totalTranslations: number;
  wordsTranslated: number;
  languagesTranslated: Set<string>;
};

const App: React.FC = () => {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [metadata, setMetadata] = useState<Metadata>({
    totalTranslations: 0,
    wordsTranslated: 0,
    languagesTranslated: new Set<string>(),
  });

  const handleTranslate = async (text: string, selectedLanguages: string[]) => {
    const newTranslations = await Promise.all(
      selectedLanguages.map(async (lang) => {
        const translatedText = await translateText(text, lang);
        return { language: lang, text: translatedText };
      })
    );

    setTranslations(newTranslations);

    const newMetadata: Metadata = {
      totalTranslations: metadata.totalTranslations + newTranslations.length,
      wordsTranslated: metadata.wordsTranslated + text.split(' ').length,
      languagesTranslated: new Set([
        ...metadata.languagesTranslated,
        ...selectedLanguages,
      ]),
    };
    setMetadata(newMetadata);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Multilingual Translator</h1>
      <TranslationForm onTranslate={handleTranslate} />
      <div className="mt-4">
        <h2 className="text-xl">Translations</h2>
        {translations.map((t, idx) => (
          <div key={idx} className="p-2 border-b">
            <strong>{t.language}:</strong> {t.text}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-xl">Metadata</h2>
        <p>Total Translations: {metadata.totalTranslations}</p>
        <p>Words Translated: {metadata.wordsTranslated}</p>
        <p>Languages Translated Into: {Array.from(metadata.languagesTranslated).join(', ')}</p>
      </div>
    </div>
  );
};

export default App;
