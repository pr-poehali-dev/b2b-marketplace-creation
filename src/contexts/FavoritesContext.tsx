import React, { createContext, useContext, useState, useEffect } from 'react';

export interface FavoriteItem {
  id: number;
  name: string;
  image: string;
  category: string;
  seller: string;
  price: number;
  unit: string;
}

interface FavoritesContextType {
  items: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
  getTotalFavorites: () => number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<FavoriteItem[]>(() => {
    const saved = localStorage.getItem('favorite-items');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorite-items', JSON.stringify(items));
  }, [items]);

  const addFavorite = (item: FavoriteItem) => {
    setItems(prevItems => {
      if (prevItems.some(i => i.id === item.id)) return prevItems;
      return [...prevItems, item];
    });
  };

  const removeFavorite = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const toggleFavorite = (item: FavoriteItem) => {
    setItems(prevItems => {
      const exists = prevItems.some(i => i.id === item.id);
      if (exists) {
        return prevItems.filter(i => i.id !== item.id);
      }
      return [...prevItems, item];
    });
  };

  const isFavorite = (id: number) => items.some(item => item.id === id);

  const clearFavorites = () => setItems([]);

  const getTotalFavorites = () => items.length;

  return (
    <FavoritesContext.Provider
      value={{
        items,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        getTotalFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
