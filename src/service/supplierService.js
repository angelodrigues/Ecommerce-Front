import { getAuthToken } from '../authCheck/tokenUtils';

export const getSuppliers = async () => {
  const token = getAuthToken();
  console.log('Token usado para fornecedores:', token);
  
  const response = await fetch('http://52.67.254.235:8090/supplier', {
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  });
  
  console.log('Status da resposta:', response.status);
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Resposta de erro:', errorText);
    throw new Error('Erro ao buscar fornecedores');
  }
  
  const data = await response.json();
  console.log('Dados dos fornecedores:', data);
  return data;
};

export const createSupplier = async (supplierData) => {
  const token = getAuthToken();
  const response = await fetch('http://52.67.254.235:8090/supplier', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(supplierData)
  });
  if (!response.ok) {
    throw new Error('Erro ao criar fornecedor');
  }
  return response.json();
};
