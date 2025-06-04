export async function getAllProducts() {
  const response = await fetch('http://52.67.254.235:8090/product');
  if (!response.ok) throw new Error('Erro ao buscar produtos');
  return response.json();
}

export function getProductImageUrl(id) {
  return `http://52.67.254.235:8090/product-image/${id}/image`;
} 