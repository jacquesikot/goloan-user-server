import { hashValue, validatePassword } from '../../../src/services';

describe('validate password', () => {
    const password = '123456';

    test('should return true if correct password is passed', async () => {
        const hashedValue = await hashValue(password);

        const result = await validatePassword('123456', hashedValue.toString());

        expect(result).toBe(true);
    });
});
