import { generateRandomString } from "../utils/generateRandomString";

describe('Generate random string', () => {
    test('should generate expected length of random string', () => {
        // Arrange
        const expectedLength = 8;

        // Act
        const result = generateRandomString(expectedLength);

        // Assert
        expect(result.length).toEqual(expectedLength);
    })
})