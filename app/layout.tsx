'use client';

import { Footer, Header } from '@lib/designSystem/';
import i18n from '@lib/i18n/i18n';
import { persistor, store } from '@lib/store';
import ThemeProviderWrapper from '@providers/ThemeProviderWrapper';
import { Geist, Geist_Mono } from 'next/font/google';
import { useEffect, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const { i18n: i18nextInstance } = useTranslation();
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');

  useEffect(() => {
    const handleInit = () => {
      setReady(true);
      setDir(i18nextInstance.language === 'ar' ? 'rtl' : 'ltr');
    };

    const handleLangChange = (lng: string) => {
      document.documentElement.lang = lng;
      document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
      setDir(lng === 'ar' ? 'rtl' : 'ltr');
    };

    if (i18n.isInitialized) handleInit();
    else i18n.on('initialized', handleInit);

    i18nextInstance.on('languageChanged', handleLangChange);

    return () => {
      i18nextInstance.off?.('initialized', handleInit);
      i18nextInstance.off?.('languageChanged', handleLangChange);
    };
  }, [i18nextInstance]);

  const isRTL = i18n.language === 'ar';

  return (
    <html lang={ready ? i18n.language : 'en'} dir={ready && isRTL ? 'rtl' : 'ltr'}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {!ready ? (
          <div style={{ opacity: 0 }}>Loading...</div>
        ) : (
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <I18nextProvider i18n={i18n}>
                <ThemeProviderWrapper>
                  <Header />
                  {children}
                  <Footer />
                </ThemeProviderWrapper>
              </I18nextProvider>
            </PersistGate>
          </Provider>
        )}
      </body>
    </html>
  );
}
