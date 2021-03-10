import { ICard } from '../../../src/interfaces';
import { cardService } from '../../../src/loaders/dependencyInjector';
import testHelpers from '../../../src/testHelpers';

describe('cardService.createCard', () => {
    afterEach(async () => {
        await testHelpers.cleanDatabase();
    });

    test('should create new card and return the new card', async () => {
        const user = await testHelpers.createTestUser();

        const cardData: Partial<ICard> = {
            user_id: user.id as string,
            card_name: 'Jimmy Falon',
            card_number: '1234567890123',
            card_cvv: '234',
            card_expiry: '2454',
        };

        const newCard = await cardService.createCard(cardData);

        expect(newCard).toHaveProperty('card_name', cardData.card_name);
    });
});
