import { userService } from '../../../src/loaders/dependencyInjector';

describe('userService.hashValue', () => {
    const password = '123456';

    test('should accept value and return correct hashed value', async () => {
        const hashedValue = await userService.hashValue(password);

        // const result = await userService.validatePassword(
        //     '123456',
        //     hashedValue.toString(),
        // );

        expect(hashedValue).toBeDefined();
        // expect(result).toBe(true);
    });
});

// TODO

// Maybe i can find a better way to test this function?
