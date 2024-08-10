
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

jest.mock('@prisma/client', () => {
    const mockPrisma = {
        user: {
            create: jest.fn(),
            createMany: jest.fn(),
            findMany: jest.fn(),
            findFirst: jest.fn(),
        },
        project: {
            create: jest.fn(),
            findMany: jest.fn(),
            findFirst: jest.fn(),
            delete: jest.fn(),
        }
    };

    return {
        PrismaClient: jest.fn(() => mockPrisma),
    }
})
