import { cardService } from '../../../src/loaders/dependencyInjector';
import testHelpers from '../../../src/testHelpers';

describe('cardService.checkIfCardExists', () => {
    afterEach(async () => {
        await testHelpers.cleanDatabase();
    });

    test('should return true if card with given id exists', async () => {
        const card = await testHelpers.createTestCard();

        const checkCard = await cardService.checkIfCardExists(
            card.id as string,
        );

        expect(checkCard).toBe(true);
    });
});
