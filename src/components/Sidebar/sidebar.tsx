// import React, { useState, useEffect, useRef } from 'react';
// import { Box } from '@mui/material';
// import { SortControls } from './SortControls';
// import { CategoryFilter } from './CategoryFilters';
// import { BrandFilter } from './BrandFilter';
// import { PriceFilter } from './PriceFilter';
// import { RatingFilter } from './RatingFilter';
// import type { SidebarFilters, SortOption } from '../../types/Sidebar/types';

// interface Props {
//   categories: string[];
//   brands: string[];
//   onFilterChange: (changes: Partial<SidebarFilters>) => void;
//   sortOption: SortOption;
//   onSortChange: (opt: SortOption) => void;
// }

// export const Sidebar: React.FC<Props> = ({
//   categories,
//   brands,
//   onFilterChange,
//   sortOption,
//   onSortChange,
// }) => {
//   const [cats, setCats] = useState<string[]>([]);
//   const [brs, setBrs] = useState<string[]>([]);
//   const [prices, setPrices] = useState<[number, number][]>([]);
//   const [ratings, setRatings] = useState<[number, number][]>([]);
//   const first = useRef(true);

//   useEffect(() => {
//     if (first.current) {
//       first.current = false;
//       return;
//     }
//     onFilterChange({
//       categories: cats,
//       brands: brs,
//       priceRanges: prices,
//       ratingRanges: ratings,
//     });
//   }, [cats, brs, prices, ratings, onFilterChange]);

//   const handleCat = (c: string, ok: boolean) =>
//     setCats(prev => (ok ? [...prev, c] : prev.filter(x => x !== c)));
//   const handleBr = (b: string, ok: boolean) =>
//     setBrs(prev => (ok ? [...prev, b] : prev.filter(x => x !== b)));
//   const handlePrice = (r: [number, number], ok: boolean) =>
//     setPrices(prev => (ok ? [...prev, r] : prev.filter(x => !(x[0] === r[0] && x[1] === r[1]))));
//   const handleRating = (r: [number, number], ok: boolean) =>
//     setRatings(prev => (ok ? [...prev, r] : prev.filter(x => !(x[0] === r[0] && x[1] === r[1]))));

//   return (
//     <Box
//       sx={{
//         width: 240,
//         p: 2,
//         borderRight: theme => `1px solid ${theme.palette.divider}`,
//         flexShrink: 0,
//       }}
//     >
//       <SortControls sortOption={sortOption} onSortChange={onSortChange} />

//       <Box sx={{ mt: 2 }}>
//         <CategoryFilter categories={categories} selected={cats} onChange={handleCat} />

//         <BrandFilter brands={brands} selected={brs} onChange={handleBr} />

//         <PriceFilter selected={prices} onChange={handlePrice} />

//         <RatingFilter selected={ratings} onChange={handleRating} />
//       </Box>
//     </Box>
//   );
// };

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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<[number, number][]>([]);
  const [selectedRatingRanges, setSelectedRatingRanges] = useState<[number, number][]>([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onFilterChange({
      categories: selectedCategories,
      brands: selectedBrands,
      priceRanges: selectedPriceRanges,
      ratingRanges: selectedRatingRanges,
    });
  }, [
    selectedCategories,
    selectedBrands,
    selectedPriceRanges,
    selectedRatingRanges,
    onFilterChange,
  ]);

  const handleCategoryChange = (category: string, isChecked: boolean) =>
    setSelectedCategories(previous =>
      isChecked
        ? [...previous, category]
        : previous.filter(existingCategory => existingCategory !== category),
    );

  const handleBrandChange = (brand: string, isChecked: boolean) =>
    setSelectedBrands(previous =>
      isChecked ? [...previous, brand] : previous.filter(existingBrand => existingBrand !== brand),
    );

  const handlePriceRangeChange = (priceRange: [number, number], isChecked: boolean) =>
    setSelectedPriceRanges(previous =>
      isChecked
        ? [...previous, priceRange]
        : previous.filter(
            existingRange =>
              !(existingRange[0] === priceRange[0] && existingRange[1] === priceRange[1]),
          ),
    );

  const handleRatingRangeChange = (ratingRange: [number, number], isChecked: boolean) =>
    setSelectedRatingRanges(previous =>
      isChecked
        ? [...previous, ratingRange]
        : previous.filter(
            existingRange =>
              !(existingRange[0] === ratingRange[0] && existingRange[1] === ratingRange[1]),
          ),
    );

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
        <CategoryFilter
          categories={categories}
          selected={selectedCategories}
          onChange={handleCategoryChange}
        />

        <BrandFilter brands={brands} selected={selectedBrands} onChange={handleBrandChange} />

        <PriceFilter selected={selectedPriceRanges} onChange={handlePriceRangeChange} />

        <RatingFilter selected={selectedRatingRanges} onChange={handleRatingRangeChange} />
      </Box>
    </Box>
  );
};
