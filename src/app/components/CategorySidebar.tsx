import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { mainCategories, subcategoryProductCodes } from '../data/products';

interface CategorySidebarProps {
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export function CategorySidebar({ selectedCategory, onCategorySelect }: CategorySidebarProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('may-bom-nuoc');
  const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === expandedCategory) {
      setExpandedCategory(null);
      setExpandedSubcategory(null);
    } else {
      setExpandedCategory(categoryId);
      setExpandedSubcategory(null);
    }
    
    // If category has no subcategories, select it
    const category = mainCategories.find(c => c.id === categoryId);
    if (!category?.subcategories) {
      onCategorySelect(categoryId);
    }
  };

  const handleSubcategoryClick = (subcategory: string) => {
    // If subcategory has product codes, expand it instead of selecting
    if (subcategoryProductCodes[subcategory]) {
      if (expandedSubcategory === subcategory) {
        setExpandedSubcategory(null);
      } else {
        setExpandedSubcategory(subcategory);
      }
    } else {
      onCategorySelect(subcategory);
    }
  };

  const handleProductCodeClick = (code: string) => {
    onCategorySelect(code);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Main Categories */}
      <div className="border-b border-gray-200">
        <div className="p-4 bg-blue-600 text-white">
          Danh mục sản phẩm
        </div>
        <div className="divide-y divide-gray-200">
          {mainCategories.map((category) => (
            <div key={category.id}>
              <button
                onClick={() => handleCategoryClick(category.id)}
                className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left ${
                  selectedCategory === category.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <span>{category.name}</span>
                {category.subcategories && (
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      expandedCategory === category.id ? 'rotate-90' : ''
                    }`}
                  />
                )}
              </button>

              {/* Subcategories */}
              {category.subcategories && expandedCategory === category.id && (
                <div className="bg-gray-50 py-2">
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory}>
                      <button
                        onClick={() => handleSubcategoryClick(subcategory)}
                        className={`w-full text-left px-8 py-2 text-sm hover:text-blue-600 transition-colors flex items-center justify-between ${
                          selectedCategory === subcategory
                            ? 'text-blue-600'
                            : 'text-gray-600'
                        }`}
                      >
                        <span>{subcategory}</span>
                        {subcategoryProductCodes[subcategory] && (
                          <ChevronRight
                            className={`w-3 h-3 transition-transform ${
                              expandedSubcategory === subcategory ? 'rotate-90' : ''
                            }`}
                          />
                        )}
                      </button>

                      {/* Product Codes for Subcategory */}
                      {subcategoryProductCodes[subcategory] && expandedSubcategory === subcategory && (
                        <div className="bg-white py-2">
                          <div className="px-12 py-1 text-xs text-gray-500">Mã sản phẩm:</div>
                          {subcategoryProductCodes[subcategory].map((code) => (
                            <button
                              key={code}
                              onClick={() => handleProductCodeClick(code)}
                              className={`w-full text-left px-12 py-1.5 text-sm hover:text-blue-600 transition-colors ${
                                selectedCategory === code
                                  ? 'text-blue-600 bg-blue-50'
                                  : 'text-blue-600'
                              }`}
                            >
                              {code}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reset Filter */}
      {selectedCategory && (
        <div className="p-4 border-t">
          <button
            onClick={() => {
              onCategorySelect(null);
              setExpandedCategory('may-bom-nuoc');
              setExpandedSubcategory(null);
            }}
            className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}