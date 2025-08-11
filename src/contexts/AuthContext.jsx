import { createContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext({
    auth: null,
    user: null,
    updateProfile: () => {},
    logout: () => {},
    setToken: () => {}, // Add setToken to context
});

const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        const savedToken = localStorage.getItem("token");
        // Only return the token if it's not null, undefined, or empty string
        const validToken = savedToken && savedToken !== "null" && savedToken !== "undefined" ? savedToken : null;
        console.log("AuthContext: Initializing token from localStorage:", { savedToken, validToken });
        return validToken;
    });
    const [profile, setProfile] = useState(() => {
        const savedProfile = localStorage.getItem("userProfile");
        return savedProfile ? JSON.parse(savedProfile) : null;
    });
    const navigate = useNavigate();

    const logout = () => {
        console.log("AuthContext: Logging out, clearing token and profile");
        setToken(null);
        setProfile(null);
        navigate('/?type=all');
    }

    useEffect(() => {
        console.log("AuthContext: Token changed:", token);
        if (token && token !== "null" && token !== "undefined") {
            localStorage.setItem("token", token);
            console.log("AuthContext: Token saved to localStorage:", token);
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("userProfile");
            console.log("AuthContext: Token and profile removed from localStorage");
        }
    }, [token]);

    useEffect(() => {
        if (token && token !== "null" && token !== "undefined") {
            const interval = setInterval(() => {
                fetch('https://lion11.online/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    }
                })
                .then(res => {
                    if (res.status === 401) {
                        logout();
                        return Promise.reject('Unauthorized');
                    }
                    if (!res.ok) {
                        return Promise.reject('Failed to fetch balance');
                    }
                    return res.json();
                })
                .then(data => {
                    if (data && data.data) {
                        setProfile(currentProfile => {
                            if (
                                !currentProfile ||
                                currentProfile.balance !== data.data.balance ||
                                currentProfile.main_balance !== data.data.main_balance
                            ) {
                                const updatedProfile = { ...currentProfile, ...data.data };
                                localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
                                return updatedProfile;
                            }
                            return currentProfile;
                        });
                    }
                })
                .catch(error => {
                    if (error !== 'Unauthorized') {
                        console.error("Error fetching real-time balance:", error);
                    }
                });
            }, 5000); // Fetch every 5 seconds

            return () => clearInterval(interval);
        }
    }, [token]);

    const updateProfile = (newProfile) => {
        console.log("AuthContext: Updating profile:", newProfile);
        setProfile(newProfile);
        if (newProfile) {
            localStorage.setItem("userProfile", JSON.stringify(newProfile));
        } else {
            localStorage.removeItem("userProfile");
        }
    };

    const value = useMemo(() => ({
        auth: token,
        user: profile,
        updateProfile,
        logout,
        setToken, // Expose setToken to context consumers
    }), [token, profile]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
