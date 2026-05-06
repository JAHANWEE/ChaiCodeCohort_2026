import { useState, useEffect, useCallback } from 'react';

const BASE_URL = 'https://api.freeapi.app/api/v1/public/randomproducts';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit] = useState(10);

  const fetchProducts = useCallback(async (pageNum) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}?page=${pageNum}&limit=${limit}`);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const json = await res.json();
      const { data } = json;
      setProducts(data.data);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchProducts(page);
  }, [page, fetchProducts]);

  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  return { products, loading, error, page, totalPages, totalItems, limit, goToPage, refetch: () => fetchProducts(page) };
}
