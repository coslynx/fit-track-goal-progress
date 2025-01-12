// Import the axios library for making HTTP requests.
import axios from 'axios';
// Import dotenv to load environment variables
import dotenv from 'dotenv';

dotenv.config();

/**
 * Creates a configured axios instance with a base URL and interceptors.
 * @returns {{request: function}} - An object containing the request function.
 */
const apiService = () => {
    // Determine the base URL from the environment variable or use a default value.
    const baseURL = process.env.CLIENT_URL || 'http://localhost:5000';

    // Create an axios instance with the base URL.
    const axiosInstance = axios.create({
        baseURL: baseURL,
    });


    // Add a request interceptor to include the authentication token from local storage.
     axiosInstance.interceptors.request.use(
        (config) => {
           try {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            } catch (error) {
                 if (process.env.NODE_ENV !== 'production') {
                    console.error('Error accessing localStorage:', error);
                }
            }
            return config;
        },
        (error) => {
            if (process.env.NODE_ENV !== 'production') {
                console.error('Request interceptor error:', error);
            }
            return Promise.reject(error);
        }
    );

    // Add a response interceptor to handle errors.
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (process.env.NODE_ENV !== 'production') {
                console.error('Response interceptor error:', error);
            }
            return Promise.reject(error);
        }
    );


    /**
     * Performs an HTTP request using the configured axios instance.
     * @param {string} url - The request URL.
     * @param {string} method - The HTTP method (GET, POST, PUT, DELETE, etc.).
     * @param {object} [data] - The request body data (optional).
     * @returns {Promise<any>} - A Promise that resolves with the response data or rejects with an error.
     * @throws {Error} - If a network error occurs.
     */
     const request = async (url, method, data) => {
        try {
            const response = await axiosInstance({
                url,
                method,
                data,
            });
            return response.data;
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('API request failed:', error);
            }

            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                 return Promise.reject(new Error(error.response.data.message || 'Request failed with status: ' + error.response.status));
            } else if (error.request) {
                // The request was made but no response was received
                return Promise.reject(new Error('Network error: Request failed'));
            } else {
                // Something happened in setting up the request that triggered an Error
                return Promise.reject(new Error('Request setup error: ' + error.message));
            }

        }
    };

    return {
        request,
    };
};

// Export the request function
const { request } = apiService();
export default request;