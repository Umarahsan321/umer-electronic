'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'PKR' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  exchangeRate: number; // 1 USD in PKR
  setCurrency: (c: Currency) => void;
  toggleCurrency: () => void;
  formatPrice: (amountInUSD: number) => string;
  convertPrice: (amountInUSD: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const USD_TO_PKR_RATE = 280;

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>('PKR');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ue_currency') as Currency | null;
      if (saved === 'PKR' || saved === 'USD') {
        setCurrencyState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('ue_currency', c);
    } catch {
      // ignore
    }
  };

  const toggleCurrency = () => {
    const next = currency === 'PKR' ? 'USD' : 'PKR';
    setCurrency(next);
  };

  const convertPrice = (amountInUSD: number): number => {
    if (currency === 'PKR') {
      return Math.round(amountInUSD * USD_TO_PKR_RATE);
    }
    return amountInUSD;
  };

  const formatPrice = (amountInUSD: number): string => {
    if (currency === 'PKR') {
      const pkr = Math.round(amountInUSD * USD_TO_PKR_RATE);
      return `Rs. ${pkr.toLocaleString('en-PK')}`;
    }
    return `$${amountInUSD.toLocaleString('en-US')}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        exchangeRate: USD_TO_PKR_RATE,
        setCurrency,
        toggleCurrency,
        formatPrice,
        convertPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
