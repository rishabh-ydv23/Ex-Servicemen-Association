declare module './LanguageContext.jsx' {
  import { Context } from 'react';
  
  interface LanguageContextType {
    language: string;
    setLanguage: (language: string) => void;
    t: (key: string) => string;
  }
  
  export function LanguageProvider(props: { children: React.ReactNode }): JSX.Element;
  export function useLanguage(): LanguageContextType;
}   