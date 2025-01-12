import { useState, useCallback } from 'react';
import request from '../services/api.js';
import {  useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js';
import PropTypes from 'prop-types';

/**
 * Custom hook for managing API requests.
 * @returns {{fetchData: function, loading: boolean, error: Error | null}} - An object containing the fetchData function, loading state, and error state.
 */
const useFetch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
     const { token } = useContext(AuthContext);


    /**
     * Performs an HTTP request using the configured axios instance.
     * @async
     * @param {string} url - The request URL.
     * @param {string} method - The HTTP method (GET, POST, PUT, DELETE, etc.).
     * @param {object} [data] - The request body data (optional).
      * @param {string} [token] - The JWT token for authorization (optional)
     * @returns {Promise<any>} - A Promise that resolves with the response data or rejects with an error.
     * @throws {Error} - If a network error occurs.
     */
    const fetchData = useCallback(async (url, method, data = null, authToken = null) => {

        if (typeof url !== 'string' || !url) {
             if (process.env.NODE_ENV !== 'production') {
                  console.error('Invalid URL provided to fetchData:', url);
              }
            return Promise.reject(new Error('Invalid URL provided'));
        }
       if (typeof method !== 'string' || !method) {
            if (process.env.NODE_ENV !== 'production') {
                 console.error('Invalid method provided to fetchData:', method);
             }
            return Promise.reject(new Error('Invalid method provided'));
       }

        if (data && typeof data !== 'object') {
            if (process.env.NODE_ENV !== 'production') {
                console.error('Invalid data provided to fetchData:', data);
            }
            return Promise.reject(new Error('Invalid data provided'));
        }

         if (authToken && typeof authToken !== 'string') {
            if (process.env.NODE_ENV !== 'production') {
                console.error('Invalid token provided to fetchData:', authToken);
            }
             return Promise.reject(new Error('Invalid token provided'));
         }



        setLoading(true);
        setError(null);
        try {
             const responseData = await request(url, method, data,  authToken || token);
             setLoading(false);
              return responseData;
        } catch (fetchError) {
              setLoading(false);
            if (process.env.NODE_ENV !== 'production') {
                 console.error('API request failed:', fetchError);
             }
            setError(fetchError);
            return Promise.reject(fetchError);
        }
    }, [request, token]);


    return { fetchData, loading, error };
};
export default useFetch;

useFetch.propTypes = {
    url: PropTypes.string,
    method: PropTypes.string,
    data: PropTypes.object,
    token: PropTypes.string,
};