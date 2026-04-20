import { useState, useEffect } from 'react';
import axios from 'axios';

// A mock rate or an open exchange rate API can be used. 
// For demo, we fallback to static rates if API fails.
const FALLBACK_RATES = {
  USD: 1,
  INR: 83.0,
  EUR: 0.92,
  GBP: 0.79
};

const useCurrency = (baseCurrency = 'INR') => {
  const [rates, setRates] = useState(FALLBACK_RATES);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState(baseCurrency);

  useEffect(() => {
    // Optionally fetch from https://api.exchangerate-api.com
    const fetchRates = async () => {
      setLoading(true);
      try {
        // Mock API call to public endpoint (Open.ER-API)
        const response = await axios.get('https://open.er-api.com/v6/latest/USD');
        if (response.data && response.data.rates) {
          setRates(response.data.rates);
        }
      } catch (error) {
        console.error("Failed to fetch rates, using fallback:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  // Format currency based on selected currency code
  const formatCurrency = (amount, targetCurrency = currency) => {
    // Basic calculation: amount is stored in baseCurrency (INR). 
    // If we want to display it in targetCurrency, we convert.
    // However, typically amounts are stored without converting dynamically unless specified.
    // For this app, let's assume we store amounts as they are and format them with Intl.NumberFormat.
    
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: targetCurrency,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return { currency, setCurrency, formatCurrency, rates, loading };
};

export default useCurrency;
