import  useLocalStorage from './useLocalStorage';

// Custom hook to manage favorite array of objects
const useFavoriteBeer = <T>(key: string, initialValue: T[]) => {
    // Initialize favorite data from local storage
    const { data: favorites, setData: setFavorites, removeItem: clearFavorites } = useLocalStorage<T[]>(key, initialValue);

    // Add a favorite object to the array
    const addFavorite = (favorite: T) => {
        setFavorites([...favorites, favorite]);
    };

    // Remove a favorite object from the array
    const removeFavorite = (index: number) => {
        const updatedFavorites = [...favorites];
        updatedFavorites.splice(index, 1);
        setFavorites(updatedFavorites);
    };

    return { favorites, addFavorite, removeFavorite, clearFavorites };
};

export default useFavoriteBeer;