import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const useLoadApp = () => {
    const [isLoading, setLoading] = useState(true);
    const isLoggedIn = false;

    React.useEffect(() => {
        setTimeout(() => setLoading(false), 3000);
    }, []);

    return { isLoading, isLoggedIn };
}