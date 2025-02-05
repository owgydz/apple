// Copyright 2025 the Apple authors.
// This project is governed under the Mozilla Public License, v2.0. View in the LICENSE file.  
// You need Jest for these unit tests. Install with this command: npm i --save-dev @types/jest

import { fetchResource, fetchJSON, fetchImage } from '../network';

describe('Network Module', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    it('should fetch a resource', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            text: async () => 'Hello, world!',
        });
        const result = await fetchResource('http://example.com');
        expect(result).toBe('Hello, world!');
    });

    it('should fetch JSON data', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => ({ message: 'Hello, world!' }),
        });
        const result = await fetchJSON('http://example.com/data.json');
        expect(result).toEqual({ message: 'Hello, world!' });
    });

    it('should fetch an image', async () => {
        const mockImage = new Image();
        (global.fetch as jest.Mock).mockResolvedValue(mockImage);
        const result = await fetchImage('https://picsum.photos/200');
        expect(result).toBe(mockImage);
    });
});
