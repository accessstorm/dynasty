import { useState, useEffect } from 'react';
import { Text, RangeSlider, Button, ColorSwatch, NumberInput, ActionIcon } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconFilter, IconX } from '@tabler/icons-react';

interface FilterSidebarProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  colorFilters: {
    color: string;
    label: string;
    count: number;
    colorCode: string;
  }[];
  onColorFilterChange: (color: string) => void;
  selectedColors: string[];
}

const FilterSidebar = ({
  priceRange,
  onPriceRangeChange,
  colorFilters,
  onColorFilterChange,
  selectedColors
}: FilterSidebarProps) => {
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Update local price range when props change
  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);
  
  const handlePriceRangeChange = (value: [number, number]) => {
    setLocalPriceRange(value);
  };
  
  const handleMinPriceChange = (value: number) => {
    if (value >= 0 && value <= localPriceRange[1]) {
      setLocalPriceRange([value, localPriceRange[1]]);
    }
  };
  
  const handleMaxPriceChange = (value: number) => {
    if (value >= localPriceRange[0]) {
      setLocalPriceRange([localPriceRange[0], value]);
    }
  };
  
  const applyPriceFilter = () => {
    onPriceRangeChange(localPriceRange);
  };
  
  const isColorSelected = (color: string) => selectedColors.includes(color);
  
  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };
  
  // The main sidebar content - price and color filters
  const renderFilterContent = () => (
    <>
      {/* Price Filter Section */}
      <div className="mb-8">
        <Text className="text-xl font-medium mb-6 border-b pb-2" id="price-filter-heading">Filter by price</Text>
        
        <div className="mb-6" role="group" aria-labelledby="price-filter-heading">
          <RangeSlider
            min={3400}
            max={18000}
            step={100}
            value={localPriceRange}
            onChange={handlePriceRangeChange}
            minRange={100}
            label={null}
            thumbSize={14}
            aria-label="Price range"
            styles={{
              track: { height: 4 },
              thumb: { 
                backgroundColor: "#fff", 
                borderWidth: 1, 
                borderColor: "#000",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)" 
              }
            }}
          />
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Text size="sm" color="dimmed">Price:</Text>
            <div className="flex items-center">
              <Text size="sm" className="mr-1">₹</Text>
              <NumberInput
                value={localPriceRange[0]}
                onChange={(val) => handleMinPriceChange(val as number)}
                min={3400}
                max={localPriceRange[1]}
                step={100}
                size="xs"
                styles={{ input: { width: '60px', padding: '2px 8px' } }}
                hideControls
                aria-label="Minimum price"
              />
            </div>
            <Text size="sm">—</Text>
            <div className="flex items-center">
              <Text size="sm" className="mr-1">₹</Text>
              <NumberInput
                value={localPriceRange[1]}
                onChange={(val) => handleMaxPriceChange(val as number)}
                min={localPriceRange[0]}
                max={18000}
                step={100}
                size="xs"
                styles={{ input: { width: '60px', padding: '2px 8px' } }}
                hideControls
                aria-label="Maximum price"
              />
            </div>
          </div>
          <Button 
            variant="outline" 
            size="xs" 
            radius="xs" 
            onClick={applyPriceFilter} 
            className="uppercase text-xs font-medium"
            aria-label="Apply price filter"
          >
            FILTER
          </Button>
        </div>
      </div>
      
      {/* Color Filter Section */}
      <div className="mb-8">
        <Text className="text-xl font-medium mb-6 border-b pb-2" id="color-filter-heading">Filter by color</Text>
        <div className="space-y-3" role="group" aria-labelledby="color-filter-heading">
          {colorFilters.map(({ color, label, count, colorCode }) => (
            <div 
              key={color} 
              className="flex items-center justify-between cursor-pointer py-1 hover:bg-gray-50"
              onClick={() => onColorFilterChange(color)}
              role="checkbox"
              aria-checked={isColorSelected(color)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onColorFilterChange(color);
                  e.preventDefault();
                }
              }}
            >
              <div className="flex items-center space-x-3">
                <ColorSwatch 
                  color={colorCode} 
                  size={16}
                  className={`rounded-full ${isColorSelected(color) ? "ring-2 ring-black" : "ring-1 ring-gray-300"}`}
                  aria-hidden="true"
                />
                <Text className="text-base">{label}</Text>
              </div>
              <Text size="sm" color="dimmed" className="font-light tabular-nums">{count.toString().padStart(2, '0')}</Text>
            </div>
          ))}
        </div>
      </div>
    </>
  );
  
  // Mobile filter button
  if (isMobile && !isMobileOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          onClick={toggleMobileSidebar}
          className="bg-black text-white shadow-lg"
          radius="md"
          aria-label="Open filters"
          aria-expanded="false"
          aria-controls="mobile-filters"
          leftSection={<IconFilter size={16} />}
        >
          Filters
        </Button>
      </div>
    );
  }
  
  // Mobile overlay sidebar
  if (isMobile && isMobileOpen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
        <div 
          className="bg-white w-5/6 h-full p-6 overflow-y-auto animate-slide-in-right"
          id="mobile-filters"
          role="dialog"
          aria-modal="true"
          aria-labelledby="filter-heading"
        >
          <div className="flex justify-between items-center mb-4 border-b pb-3">
            <Text className="text-xl font-medium">Filters</Text>
            <ActionIcon onClick={toggleMobileSidebar} aria-label="Close filters">
              <IconX size={24} />
            </ActionIcon>
          </div>
          {renderFilterContent()}
        </div>
      </div>
    );
  }
  
  // Desktop sidebar
  return (
    <div className="w-full sticky top-4">
      {renderFilterContent()}
    </div>
  );
};

export default FilterSidebar; 