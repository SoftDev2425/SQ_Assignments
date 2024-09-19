import { validatePassword } from "../../utils/validatePassword";

describe('Password boundary test', () => {
    let password = 'foo';

    test('should approve password at minimum length', () => {
        // Arrange
        password = '12345678';

        // Act
        const result = validatePassword(password);

        // Assert
        expect(result).toBe(true);
    })

    test('should reject password below minimum length', () => {
        // Arrange
        password = '1234567';

        // Act
        const result = validatePassword(password);

        // Assert
        expect(result).toBe(false);
    })

    test('should approve password at maximum length', () => {
        // Arrange
        password = 'abcdefghijklmnop';

        // Act
        const result = validatePassword(password);

        // Assert
        expect(result).toBe(true);
    })

    test('should reject password over maximum length', () => {
        // Arrange
        password = 'abcdefghijklmnopq'

        // Act
        const result = validatePassword(password);

        // Assert
        expect(result).toBe(false);
    })
})