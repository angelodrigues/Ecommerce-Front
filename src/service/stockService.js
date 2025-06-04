import { getAuthToken } from '../authCheck/tokenUtils';

export const getStocks = async () => {
  const token = getAuthToken();
  console.log('Token usado para estoques:', token);
  
  const response = await fetch('http://52.67.254.235:8090/stock', {
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  });
  
  console.log('Status da resposta:', response.status);
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Resposta de erro:', errorText);
    throw new Error('Erro ao buscar estoques');
  }
  
  const data = await response.json();
  console.log('Dados dos estoques:', data);
  return data;
};

export const createStock = async (stockData) => {
  const token = getAuthToken();
  const response = await fetch('http://52.67.254.235:8090/stock', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(stockData)
  });
  if (!response.ok) {
    throw new Error('Erro ao criar estoque');
  }
  return response.json();
};
