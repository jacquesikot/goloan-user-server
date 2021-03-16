import { cardService } from '../../../src/loaders/dependencyInjector';
import testHelpers from '../../../src/testHelpers';

describe('cardService.deleteCard', () => {
    afterEach(async () => {
        await testHelpers.cleanDatabase();
    });

    test('it should delete user card and return true', async () => {
        const newCard = await testHelpers.createTestCard();

        const deletedCard = await cardService.deleteCard(newCard!.id);

        expect(deletedCard).toBe(true);
    });
});
