import { useEffect, useState } from 'react';

// Custom hook to manage local storage data
const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [data, setData] = useState<T>(() => {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(data));
    }, [key, data]);

    // Function to remove an item from local storage
    const removeItem = () => {
        localStorage.removeItem(key);
        setData(initialValue); // Reset data to initialValue
    };

    return { data, setData, removeItem };
};

export default useLocalStorage;