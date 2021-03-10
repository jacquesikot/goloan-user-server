import { cardService } from '../../../src/loaders/dependencyInjector';
import testHelpers from '../../../src/testHelpers';

describe('cardService.getUserCards', () => {
    afterEach(async () => {
        await testHelpers.cleanDatabase();
    });

    test('should return an array of user cards', async () => {
        const user = await testHelpers.createTestUser();

        const newCards = await testHelpers.createTwoTestCards(
            user.id as string,
        );

        const userCards = await cardService.getUserCards(user.id as string);

        expect(userCards.length).toBe(2);
        expect(userCards[0]).toHaveProperty(
            'card_number',
            newCards[0].card_number,
        );
        expect(userCards[1]).toHaveProperty(
            'card_number',
            newCards[1].card_number,
        );
    });

    test('should return empty array if user doesnt have cards', async () => {
        const user = await testHelpers.createTestUser();

        const userAccounts = await cardService.getUserCards(user.id);

        expect(userAccounts.length).toBe(0);
    });
});
