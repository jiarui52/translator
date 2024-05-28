import React, { useState } from 'react';

const languages = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ar', name: 'Arabic' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'hi', name: 'Hindi' },
];

type TranslationFormProps = {
  onTranslate: (text: string, selectedLanguages: string[]) => void;
};

const TranslationForm: React.FC<TranslationFormProps> = ({ onTranslate }) => {
  const [text, setText] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    if (selectedOptions.length <= 10) {
      setSelectedLanguages(selectedOptions);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTranslate(text, selectedLanguages);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
        className="w-full p-2 border rounded mb-4"
        rows={4}
      />
      <div className="mb-4">
        <label htmlFor="languages" className="block mb-2">Select languages (up to 10):</label>
        <select
          id="languages"
          multiple
          value={selectedLanguages}
          onChange={handleLanguageChange}
          className="w-full p-2 border rounded"
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Translate</button>
    </form>
  );
};

export default TranslationForm;
