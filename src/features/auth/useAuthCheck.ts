import React, { useEffect, useState } from 'react';

import { loadUser } from '../../services/userStorage';


export const useAuthCheck = () => {
    const [isLoading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const value = await loadUser();
                if (value) {
                    console.log("Logged user data:", value);
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return { isLoading, isLoggedIn };
}