import axios from 'axios';

// Example API Service for generic requests or future use.
// We are using Open.ER-API for free currency rates without an API key.

const api = axios.create({
  baseURL: 'https://open.er-api.com/v6/latest',
  timeout: 5000,
});

export const fetchExchangeRates = async (baseCurrency = 'USD') => {
  try {
    const response = await api.get(`/${baseCurrency}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
};

export default api;
