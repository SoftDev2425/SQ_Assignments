import { generateRandomString } from "../utils/generateRandomString";
import { validatePassword } from "../utils/validatePassword";

describe('Password boundary test', () => {
    let password = 'foo';

    test('should approve password at minimum length', () => {
        // Arrange
        password = generateRandomString(8);

        // Act
        const result = validatePassword(password);

        // Assert
        expect(result).toBe(true);
    })

    test('should reject password below minimum length', () => {
        // Arrange
        password = generateRandomString(7);

        // Act
        const result = validatePassword(password);

        // Assert
        expect(result).toBe(false);
    })

    test('should approve password at maximum length', () => {
        // Arrange
        password = generateRandomString(16);

        // Act
        const result = validatePassword(password);

        // Assert
        expect(result).toBe(true);
    })

    test('should reject password over maximum length', () => {
        // Arrange
        password = generateRandomString(17);

        // Act
        const result = validatePassword(password);

        // Assert
        expect(result).toBe(false);
    })
})