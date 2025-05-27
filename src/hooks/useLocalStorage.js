import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
    //read from local storage when the component mounts
    const[value, setValue] = useState(() => {
       try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initialValue;
        }
        catch (error) {
            console.error("Error reading local storage:", error);
            return initialValue;
        }
    });

    //save to local storage whenever the value changes
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (error) {
            console.error("Error writing to local storage:", error);
        }}, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;