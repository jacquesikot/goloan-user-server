import { userService } from '../../../src/loaders/dependencyInjector';

describe('userService.validatePassword', () => {
    const password = '123456';

    test('should return true if correct password is passed', async () => {
        const hashedValue = await userService.hashValue(password);

        const result = await userService.validatePassword(
            '123456',
            hashedValue!.toString(),
        );

        expect(result).toBe(true);
    });
});
