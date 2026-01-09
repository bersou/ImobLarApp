import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

const FAVORITES_KEY = 'elitelar_favorites';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<string[]>([]);
    const { toast } = useToast();

    // Load favorites from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(FAVORITES_KEY);
        if (stored) {
            try {
                setFavorites(JSON.parse(stored));
            } catch {
                setFavorites([]);
            }
        }
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const isFavorite = useCallback((propertyId: string) => {
        return favorites.includes(propertyId);
    }, [favorites]);

    const addFavorite = useCallback((propertyId: string) => {
        setFavorites((prev) => {
            if (prev.includes(propertyId)) return prev;
            return [...prev, propertyId];
        });
        toast({
            title: "❤️ Adicionado aos favoritos",
            description: "Imóvel salvo com sucesso!",
        });
    }, [toast]);

    const removeFavorite = useCallback((propertyId: string) => {
        setFavorites((prev) => prev.filter((id) => id !== propertyId));
        toast({
            title: "Removido dos favoritos",
            description: "Imóvel removido da sua lista.",
        });
    }, [toast]);

    const toggleFavorite = useCallback((propertyId: string) => {
        if (isFavorite(propertyId)) {
            removeFavorite(propertyId);
        } else {
            addFavorite(propertyId);
        }
    }, [isFavorite, addFavorite, removeFavorite]);

    const getFavoriteIds = useCallback(() => {
        return favorites;
    }, [favorites]);

    const getFavoriteCount = useCallback(() => {
        return favorites.length;
    }, [favorites]);

    return {
        favorites,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        getFavoriteIds,
        getFavoriteCount,
    };
};
