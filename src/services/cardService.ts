import { ICard } from 'src/interfaces';

const cardService = (logger: any, prisma: any) => {
    const checkIfCardExists = async (card_id: string) => {
        try {
            const card = await prisma.user_card.findUnique({
                where: {
                    id: card_id,
                },
            });
            if (card) return true;
        } catch (error) {
            logger.error(error);
        }
    };

    const createCard = async (user_card: Partial<ICard>) => {
        const {
            user_id,
            card_name,
            card_number,
            card_cvv,
            card_expiry,
        } = user_card as any;
        try {
            const newCard = await prisma.user_card.create({
                data: {
                    user_id,
                    card_name,
                    card_number,
                    card_expiry,
                    card_cvv,
                    created_at: new Date().toISOString(),
                },
            });

            return newCard;
        } catch (error) {
            logger.error(error);
        }
    };

    const deleteCard = async (card_id: string) => {
        try {
            await prisma.user_card.delete({
                where: {
                    id: card_id,
                },
            });
            return true;
        } catch (error) {
            logger.error(error);
        }
    };

    const getUserCards = async (user_id: string) => {
        try {
            const userCards = await prisma.user_card.findMany({
                where: {
                    user_id,
                },
            });
            if (userCards.length > 0) return userCards;
            return [];
        } catch (error) {
            logger.error(error);
        }
    };

    return {
        createCard,
        deleteCard,
        getUserCards,
        checkIfCardExists,
    };
};

export default cardService;
