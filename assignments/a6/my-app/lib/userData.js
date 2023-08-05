import { getToken } from './authenticate';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Generic function to handle requests
async function handleRequest(url, method) {
    const response = await fetch(url, {
        method: method,
        headers: {
            'content-type': 'application/json',
            'Authorization': `JWT ${getToken()}`
        }
    });

    if (response.status === 200) {
        const data = await response.json();
        return data;
    } else {
        return [];
    }
}

// Add to favourites
export async function addToFavourites(id) {
    const url = `${API_URL}/favourites/${id}`;
    return handleRequest(url, 'PUT');
}

// Remove from favourites
export async function removeFromFavourites(id) {
    const url = `${API_URL}/favourites/${id}`;
    return handleRequest(url, 'DELETE');
}

// Get favourites
export async function getFavourites() {
    const url = `${API_URL}/favourites`;
    return handleRequest(url, 'GET');
}

// Add to history
export async function addToHistory(id) {
    const url = `${API_URL}/history/${id}`;
    return handleRequest(url, 'PUT');
}

// Remove from history
export async function removeFromHistory(id) {
    const url = `${API_URL}/history/${id}`;
    return handleRequest(url, 'DELETE');
}

// Get history
export async function getHistory() {
    const url = `${API_URL}/history`;
    return handleRequest(url, 'GET');
}
