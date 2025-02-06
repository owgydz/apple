// Copyright 2025 the Apple authors.
// This project is governed by the Mozilla Public License 2.0. View in the LICENSE file.

export async function fetchResource(url: string): Promise<string> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch resource: ${response.statusText}`);
        }
        return response.text();
    } catch (error) {
        console.error('Error fetching resource:', error);
        throw error;
    }
}

export async function fetchJSON(url: string): Promise<any> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching JSON:', error);
        throw error;
    }
}

export async function fetchImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => {
            const error = new Error(`Failed to load image: ${url}`);
            console.error(error);
            reject(error);
        };
        img.src = url;
    });
}
