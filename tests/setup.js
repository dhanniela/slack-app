import { afterEach } from 'vitetest';
import { cleanUp } from '@testing-library/react';
import '@testing-library/jestdom/vitest';

afterEach(() => {
    cleanUp();
});