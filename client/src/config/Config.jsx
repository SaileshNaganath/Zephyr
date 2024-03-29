const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_TIMEOUT = process.env.REACT_APP_API_TIMEOUT;

if (!API_BASE_URL) {
    throw new Error('.env is missing the definition for REACT_APP_API_BASE_URL environment variable')
}

if (!API_TIMEOUT) {
    throw new Error('.env is missing the definition for REACT_APP_API_TIMEOUT environment variable')
}

export { API_BASE_URL, API_TIMEOUT }