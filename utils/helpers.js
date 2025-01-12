/**
 * Formats a date string into "MM/DD/YYYY" format.
 * @param {string | Date} dateString - The date string to format (e.g., "2024-01-25T12:30:00Z") or a Date object.
 * @returns {string | null} - The formatted date string in "MM/DD/YYYY" format, or null if the input is invalid.
 */
const formatDate = (dateString) => {
    if (!dateString) {
        return null;
    }

    let date;
    if (dateString instanceof Date) {
        date = dateString;
    } else {
      try{
          date = new Date(dateString);
      } catch (error) {
           return null;
      }
        if (isNaN(date.getTime())) {
            return null;
        }
    }


    try{
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }).format(date);
    
       return formattedDate
    } catch (error) {
        console.error('Error formatting date:', error);
         return null;
    }
};


/**
 * Generates a random string of the specified length.
 * @param {number} length - The length of the random string.
 * @returns {string} - A randomly generated string of alphanumeric characters, or an empty string if the length is invalid.
 */
const generateRandomString = (length) => {
    if (!length || typeof length !== 'number' || length <= 0 || !Number.isInteger(length)) {
        return '';
    }

    try {
        const crypto = await import('node:crypto');
        const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
        const hexString = randomBytes.toString('hex');

        return hexString.slice(0, length);
    } catch (error) {
        console.error('Error generating random string:', error);
        return '';
    }
};


/**
 * Capitalizes the first letter of a string and converts the rest to lowercase.
 * @param {string} string - The string to capitalize.
 * @returns {string} - A new string with the first letter capitalized and the rest in lowercase, or an empty string if the input is invalid.
 */
const capitalizeFirstLetter = (string) => {
    if (typeof string !== 'string') {
        return '';
    }

    const trimmedString = string.trim();
     if (!trimmedString) {
       return "";
     }

    try{
         return trimmedString.charAt(0).toUpperCase() + trimmedString.slice(1).toLowerCase();
    } catch (error) {
        console.error('Error capitalizing string:', error);
        return "";
    }

};


/**
 * Validates if the provided string is a valid email address.
 * @param {string} email - The email string to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
const validateEmail = (email) => {
    if (typeof email !== 'string') {
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


/**
 * Trims whitespace from the beginning and end of a string and converts it to lowercase.
 * @param {string} str - The input string.
 * @returns {string} - The trimmed and sanitized string.
 */
const trimAndSanitizeString = (str) => {
    if (typeof str !== 'string') {
       return "";
    }
    try{
        return str.trim().toLowerCase();
    } catch (error) {
        console.error("Error trimming and sanitizing string:", error);
        return "";
    }
};


export { formatDate, generateRandomString, capitalizeFirstLetter, validateEmail, trimAndSanitizeString };