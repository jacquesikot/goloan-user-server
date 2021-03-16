import { Request, Response } from 'express';

import { userAuth } from '../../src/middlewares';
import { errorMessage } from '../../src/constants';
import testHelpers from '../../src/testHelpers';

describe('userAuth', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNextFunction = jest.fn();

    beforeEach(() => {
        mockResponse = {
            json: jest.fn(),
            status: jest.fn(),
        };
    });

    afterEach(async () => {
        await testHelpers.cleanDatabase();
    });

    test('should return 400 and error if no token provided', () => {
        mockRequest = {
            headers: {},
        };

        userAuth(
            mockRequest as Request,
            mockResponse as Response,
            mockNextFunction,
        );

        expect(mockResponse.json).toBeCalledWith({
            message: errorMessage.noAuthToken,
            code: 400,
        });
    });

    test('should call next() if correct token is passed', async () => {
        const { token, userObject } = await testHelpers.getAuthToken();

        mockRequest = {
            headers: {
                'x-auth-token': token,
            },
        };

        userAuth(
            mockRequest as Request,
            mockResponse as Response,
            mockNextFunction,
        );

        expect(mockNextFunction).toBeCalledTimes(1);
    });
});
