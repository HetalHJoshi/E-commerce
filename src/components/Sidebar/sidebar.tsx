import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { SortControls } from './SortControls';
import { CategoryFilter } from './CategoryFilters';
import { BrandFilter } from './BrandFilter';
import { PriceFilter } from './PriceFilter';
import { RatingFilter } from './RatingFilter';
import type { SidebarFilters, SortOption } from '../../types/Sidebar/types';

interface Props {
  categories: string[];
  brands: string[];
  onFilterChange: (changes: Partial<SidebarFilters>) => void;
  sortOption: SortOption;
  onSortChange: (opt: SortOption) => void;
}

export const Sidebar: React.FC<Props> = ({
  categories,
  brands,
  onFilterChange,
  sortOption,
  onSortChange,
}) => {
  const [cats, setCats] = useState<string[]>([]);
  const [brs, setBrs] = useState<string[]>([]);
  const [prices, setPrices] = useState<[number, number][]>([]);
  const [ratings, setRatings] = useState<[number, number][]>([]);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    onFilterChange({
      categories: cats,
      brands: brs,
      priceRanges: prices,
      ratingRanges: ratings,
    });
  }, [cats, brs, prices, ratings, onFilterChange]);

  const handleCat = (c: string, ok: boolean) =>
    setCats(prev => (ok ? [...prev, c] : prev.filter(x => x !== c)));
  const handleBr = (b: string, ok: boolean) =>
    setBrs(prev => (ok ? [...prev, b] : prev.filter(x => x !== b)));
  const handlePrice = (r: [number, number], ok: boolean) =>
    setPrices(prev => (ok ? [...prev, r] : prev.filter(x => !(x[0] === r[0] && x[1] === r[1]))));
  const handleRating = (r: [number, number], ok: boolean) =>
    setRatings(prev => (ok ? [...prev, r] : prev.filter(x => !(x[0] === r[0] && x[1] === r[1]))));

  return (
    <Box
      sx={{
        width: 240,
        p: 2,
        borderRight: theme => `1px solid ${theme.palette.divider}`,
        flexShrink: 0,
      }}
    >
      <SortControls sortOption={sortOption} onSortChange={onSortChange} />

      <Box sx={{ mt: 2 }}>
        <CategoryFilter categories={categories} selected={cats} onChange={handleCat} />

        <BrandFilter brands={brands} selected={brs} onChange={handleBr} />

        <PriceFilter selected={prices} onChange={handlePrice} />

        <RatingFilter selected={ratings} onChange={handleRating} />
      </Box>
    </Box>
  );
};
