import {
    createContext,
    useContext,
    useState
} from "react";


// ========================================
// CREATE AUTH CONTEXT
// ========================================

const AuthContext =
    createContext();


// ========================================
// AUTH PROVIDER
// ========================================

export const AuthProvider = ({
    children
}) => {


    // ========================================
    // CURRENT USER
    // ========================================

    const [user, setUser] =
        useState(() => {

            const savedUser =
                localStorage.getItem(
                    "worknest_user"
                );


            if (savedUser) {

                return JSON.parse(
                    savedUser
                );

            }


            return null;

        });


    // ========================================
    // LOGIN
    // ========================================

    const login = (userData) => {

        setUser(
            userData
        );


        localStorage.setItem(

            "worknest_user",

            JSON.stringify(
                userData
            )

        );

    };


    // ========================================
    // LOGOUT
    // ========================================

    const logout = () => {

        setUser(
            null
        );


        localStorage.removeItem(
            "worknest_user"
        );

    };


    // ========================================
    // CONTEXT VALUE
    // ========================================

    const value = {

        user,

        login,

        logout,

        isAuthenticated:
            Boolean(user)

    };


    return (

        <AuthContext.Provider
            value={
                value
            }
        >

            {children}

        </AuthContext.Provider>

    );

};


// ========================================
// CUSTOM AUTH HOOK
// ========================================

export const useAuth = () => {

    return useContext(
        AuthContext
    );

};