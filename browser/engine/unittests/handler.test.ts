// Copyright 2025 the Apple authors.
// This project is governed under the Mozilla Public License, v2.0. View in the LICENSE file.  
// You need Jest for these unit tests. Install with this command: npm i --save-dev @types/jest 

import { addEventListener, dispatchEvent } from '../handler';

describe('Event Handler', () => {
    it('should handle a simple click event', () => {
        const mockHandler = jest.fn();
        addEventListener('click', mockHandler);
        dispatchEvent('click', { target: 'test' });
        expect(mockHandler).toHaveBeenCalledWith({ target: 'test' });
    });
});
