import bcrypt from 'bcrypt';
import { hashValue, validatePassword } from '../../../src/services';

describe('hash value', () => {
    const password = '123456';

    test('should accept value and return correct hashed value', async () => {
        const hashedValue = await hashValue(password);

        const result = await validatePassword('123456', hashedValue.toString());

        expect(hashedValue).toBeDefined();
        expect(result).toBe(true);
    });
});
