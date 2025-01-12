import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../services/api.js';
import { AuthContext } from '../context/AuthContext.js';
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from '../constants/apiEndpoints.js';


/**
 * Custom hook for managing user authentication state.
 * @returns {object} - An object containing user authentication state and methods.
 */
export const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { setUser, setToken, user, token } = useContext(AuthContext);

    /**
     * Logs in an existing user.
     * @async
     * @param {string} username - The username or email of the user.
     * @param {string} password - The password of the user.
     * @throws {Error} - If login fails.
     */
    const login = async (username, password) => {
        try {
            setLoading(true);
            const data = await request(LOGIN_ENDPOINT, 'POST', { username, password });

            if(data && data.token && data.id && data.username && data.email){
                 localStorage.setItem('token', data.token);
                 setUser({ id: data.id, username: data.username, email: data.email });
                setToken(data.token);
               if (process.env.NODE_ENV !== 'production') {
                    console.log('User logged in successfully:', data);
               }
               navigate('/dashboard');

            } else {
                 const errorMessage = 'Invalid login credentials or incomplete data received';
                 if (process.env.NODE_ENV !== 'production') {
                      console.error('Login failed:', errorMessage, data);
                 }
                  throw new Error(errorMessage);
             }
        } catch (error) {
               if (process.env.NODE_ENV !== 'production') {
                     console.error('Login failed:', error);
                 }
                 throw error;
        } finally{
             setLoading(false);
        }
    };


    /**
     * Registers a new user.
     * @async
     * @param {string} username - The username of the user.
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @throws {Error} - If registration fails.
     */
    const register = async (username, email, password) => {
        try {
            setLoading(true);
            const data  = await request(REGISTER_ENDPOINT, 'POST', { username, email, password });

              if(data && data.token && data.id && data.username && data.email){
                    localStorage.setItem('token', data.token);
                    setUser({ id: data.id, username: data.username, email: data.email });
                   setToken(data.token);
                  if (process.env.NODE_ENV !== 'production') {
                      console.log('User registered successfully:', data);
                 }
                   navigate('/dashboard');

               } else {
                   const errorMessage = 'Invalid registration data or incomplete data received';
                   if (process.env.NODE_ENV !== 'production') {
                       console.error('Registration failed:', errorMessage, data);
                  }
                   throw new Error(errorMessage);
             }

        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                 console.error('Registration failed:', error);
            }
            throw error;
        } finally{
             setLoading(false);
        }
    };


    /**
     * Logs out the current user.
     */
    const logout = () => {
        try {
            localStorage.removeItem('token');
            setUser(null);
            setToken(null);
             if (process.env.NODE_ENV !== 'production') {
                   console.log('User logged out successfully');
              }
            navigate('/');
        } catch (error) {
              if (process.env.NODE_ENV !== 'production') {
                 console.error('Error during logout:', error);
              }
        }
    };

    /**
     * Checks local storage for an existing token, on initial mount.
     */
    useEffect(() => {
        const checkAuth = async () => {
            try {
                  setLoading(true);
                  const storedToken = localStorage.getItem('token');
                  if(storedToken){
                         try {
                                const data = await request('/api/auth/me', 'GET', null, storedToken);

                                if(data && data.id && data.username){
                                     setUser({ id: data.id, username: data.username });
                                     setToken(storedToken);
                                      if (process.env.NODE_ENV !== 'production') {
                                          console.log('User session restored from local storage.');
                                     }
                                } else {
                                    localStorage.removeItem('token');
                                      if (process.env.NODE_ENV !== 'production') {
                                          console.warn('Token verification failed. Token removed');
                                      }
                                }

                           } catch (error) {
                                localStorage.removeItem('token');
                                 if (process.env.NODE_ENV !== 'production') {
                                         console.warn('Token verification failed. Token removed', error);
                                 }
                         }
                 }
             } catch (error) {
                   if (process.env.NODE_ENV !== 'production') {
                         console.error('Error accessing localStorage:', error);
                   }
             } finally {
                  setLoading(false);
             }
        };

        checkAuth();
    }, [setUser, setToken, request]);


    return {
        login,
        register,
        logout,
        user,
        token,
        loading
    };
};