// import React, { useEffect, useState, useMemo, useCallback, useDeferredValue } from 'react';
// import { Box, Button, useTheme, useMediaQuery } from '@mui/material';
// import { MainContent } from '../MainContent/MainContent';
// import { DesktopSidebar } from '../Product/DesktopSidebar';
// import { MobileFilterDrawer } from '../Product/MobileFilterDrawer';
// import type { Product } from '../../types/Product/Product';
// import { useSearch } from '../Header/SearchContext';
// import type { SidebarFilters, SortOption } from '../../types/Sidebar/types';

// const PAGE_SIZE = 20;

// export const ProductsPage: React.FC = () => {
//   const theme = useTheme();
//   const { searchTerm } = useSearch();
//   const deferredSearchTerm = useDeferredValue(searchTerm);
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const [allProducts, setAllProducts] = useState<Product[]>([]);
//   const [filters, setFilters] = useState<SidebarFilters>({
//     categories: [],
//     brands: [],
//     priceRanges: [],
//     ratingRanges: [],
//   });
//   const [sortOption, setSortOption] = useState<SortOption>('nameAsc');
//   const [loading, setLoading] = useState(true);
//   const [selected, setSelected] = useState<Product | null>(null);
//   const [page, setPage] = useState(1);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch('https://dummyjson.com/products?limit=100');
//         const data = res.ok
//           ? await res.json()
//           : await (await fetch('http://dummyjson.com/products?limit=100')).json();
//         setAllProducts(data.products);
//       } catch (err) {
//         console.error('Error loading products', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const filteredProducts = useMemo(() => {
//     let result = allProducts;
//     const q = deferredSearchTerm.trim().toLowerCase();
//     if (q) {
//       result = result.filter(
//         p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
//       );
//     }
//     if (filters.categories.length) {
//       result = result.filter(p => filters.categories.includes(p.category));
//     }
//     if (filters.brands.length) {
//       result = result.filter(p => filters.brands.includes(p.brand));
//     }
//     if (filters.priceRanges.length) {
//       result = result.filter(p =>
//         filters.priceRanges.some(([min, max]) => p.price >= min && p.price <= max),
//       );
//     }
//     if (filters.ratingRanges.length) {
//       result = result.filter(p =>
//         filters.ratingRanges.some(([min, max]) => p.rating >= min && p.rating <= max),
//       );
//     }
//     return result;
//   }, [allProducts, deferredSearchTerm, filters]);

//   const sortedProducts = useMemo(() => {
//     const arr = [...filteredProducts];
//     switch (sortOption) {
//       case 'nameAsc':
//         arr.sort((a, b) => a.title.localeCompare(b.title));
//         break;
//       case 'nameDesc':
//         arr.sort((a, b) => b.title.localeCompare(a.title));
//         break;
//       case 'priceAsc':
//         arr.sort((a, b) => a.price - b.price);
//         break;
//       case 'priceDesc':
//         arr.sort((a, b) => b.price - a.price);
//         break;
//     }
//     return arr;
//   }, [filteredProducts, sortOption]);

//   useEffect(() => {
//     const onScroll = () => {
//       if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200) {
//         setPage(p => Math.min(p + 1, Math.ceil(sortedProducts.length / PAGE_SIZE)));
//       }
//     };
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, [sortedProducts.length]);

//   const displayed = useMemo(
//     () => sortedProducts.slice(0, page * PAGE_SIZE),
//     [sortedProducts, page],
//   );

//   const handleFilterChange = useCallback((changes: Partial<SidebarFilters>) => {
//     setFilters(prev => ({ ...prev, ...changes }));
//     setPage(1);
//     setDrawerOpen(false);
//   }, []);
//   const handleSortChange = useCallback((opt: SortOption) => {
//     setSortOption(opt);
//     setPage(1);
//     setDrawerOpen(false);
//   }, []);

//   return (
//     <Box display="flex">
//       {!selected && !isMobile && (
//         <DesktopSidebar
//           products={allProducts}
//           sortOption={sortOption}
//           onSortChange={handleSortChange}
//           onFilterChange={handleFilterChange}
//         />
//       )}

//       <Box sx={{ flex: 1 }}>
//         {isMobile && (
//           <Button variant="outlined" onClick={() => setDrawerOpen(true)} sx={{ mb: 2 }}>
//             Filter & Sort
//           </Button>
//         )}
//         <MainContent
//           products={selected ? [selected] : displayed}
//           loading={loading}
//           selected={selected}
//           onSelect={setSelected}
//           onClose={() => setSelected(null)}
//         />
//       </Box>

//       {isMobile && (
//         <MobileFilterDrawer
//           open={drawerOpen}
//           onClose={() => setDrawerOpen(false)}
//           products={allProducts}
//           sortOption={sortOption}
//           onSortChange={handleSortChange}
//           onFilterChange={handleFilterChange}
//         />
//       )}
//     </Box>
//   );
// };

import React, { useEffect, useState, useMemo, useCallback, useDeferredValue } from 'react';
import { Box, Button, useTheme, useMediaQuery } from '@mui/material';
import { MainContent } from '../MainContent/MainContent';
import { DesktopSidebar } from '../Product/DesktopSidebar';
import { MobileFilterDrawer } from '../Product/MobileFilterDrawer';
import type { Product } from '../../types/Product/Product';
import { useSearch } from '../Header/SearchContext';
import type { SidebarFilters, SortOption } from '../../types/Sidebar/types';

const PAGE_SIZE = 20;

export const ProductsPage: React.FC = () => {
  const theme = useTheme();
  const { searchTerm } = useSearch();
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<SidebarFilters>({
    categories: [],
    brands: [],
    priceRanges: [],
    ratingRanges: [],
  });
  const [sortOption, setSortOption] = useState<SortOption>('nameAsc');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://dummyjson.com/products?limit=100');
        const jsonResponse = response.ok
          ? await response.json()
          : await (await fetch('http://dummyjson.com/products?limit=100')).json();
        setAllProducts(jsonResponse.products);
      } catch (error) {
        console.error('Error loading products', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filteredResult = allProducts;
    const queryText = deferredSearchTerm.trim().toLowerCase();

    if (queryText) {
      filteredResult = filteredResult.filter(
        product =>
          product.title.toLowerCase().includes(queryText) ||
          product.description.toLowerCase().includes(queryText),
      );
    }

    if (filters.categories.length) {
      filteredResult = filteredResult.filter(product =>
        filters.categories.includes(product.category),
      );
    }

    if (filters.brands.length) {
      filteredResult = filteredResult.filter(product => filters.brands.includes(product.brand));
    }

    if (filters.priceRanges.length) {
      filteredResult = filteredResult.filter(product =>
        filters.priceRanges.some(
          ([minPrice, maxPrice]) => product.price >= minPrice && product.price <= maxPrice,
        ),
      );
    }

    if (filters.ratingRanges.length) {
      filteredResult = filteredResult.filter(product =>
        filters.ratingRanges.some(
          ([minRating, maxRating]) => product.rating >= minRating && product.rating <= maxRating,
        ),
      );
    }

    return filteredResult;
  }, [allProducts, deferredSearchTerm, filters]);

  const sortedProducts = useMemo(() => {
    const sortedArray = [...filteredProducts];

    switch (sortOption) {
      case 'nameAsc':
        sortedArray.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'nameDesc':
        sortedArray.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'priceAsc':
        sortedArray.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        sortedArray.sort((a, b) => b.price - a.price);
        break;
    }

    return sortedArray;
  }, [filteredProducts, sortOption]);

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200) {
        setCurrentPage(previousPage =>
          Math.min(previousPage + 1, Math.ceil(sortedProducts.length / PAGE_SIZE)),
        );
      }
    };

    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [sortedProducts.length]);

  const displayedProducts = useMemo(
    () => sortedProducts.slice(0, currentPage * PAGE_SIZE),
    [sortedProducts, currentPage],
  );

  const handleFilterChange = useCallback((changes: Partial<SidebarFilters>) => {
    setFilters(previousFilters => ({ ...previousFilters, ...changes }));
    setCurrentPage(1);
    setIsDrawerOpen(false);
  }, []);

  const handleSortChange = useCallback((newSortOption: SortOption) => {
    setSortOption(newSortOption);
    setCurrentPage(1);
    setIsDrawerOpen(false);
  }, []);

  return (
    <Box display="flex">
      {!selectedProduct && !isMobile && (
        <DesktopSidebar
          products={allProducts}
          sortOption={sortOption}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
        />
      )}

      <Box sx={{ flex: 1 }}>
        {isMobile && (
          <Button variant="outlined" onClick={() => setIsDrawerOpen(true)} sx={{ mb: 2 }}>
            Filter & Sort
          </Button>
        )}
        <MainContent
          products={selectedProduct ? [selectedProduct] : displayedProducts}
          loading={isLoading}
          selected={selectedProduct}
          onSelect={setSelectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </Box>

      {isMobile && (
        <MobileFilterDrawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          products={allProducts}
          sortOption={sortOption}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
        />
      )}
    </Box>
  );
};
