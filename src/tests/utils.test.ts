import { describe, it, expect } from 'vitest';
import { capitalize, isOnlyLetters } from '../utils/utils';

describe('Utility Functions', () => {
  
  describe('capitalize', () => {
    it('should capitalize the first letter and lowercase the rest', () => {
      expect(capitalize('aPPLE')).toBe('Apple');
      expect(capitalize('banana')).toBe('Banana');
      expect(capitalize('ORANGE')).toBe('Orange');
    });

    it('should handle single character strings', () => {
      expect(capitalize('a')).toBe('A');
    });

    it('should return an empty string if input is empty', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle strings that are already capitalized', () => {
      expect(capitalize('Apple')).toBe('Apple');
    });
  });

  describe('isOnlyLetters', () => {
    it('should return true for strings containing only letters', () => {
      expect(isOnlyLetters('Apple')).toBe(true);
      expect(isOnlyLetters('Vintage Watch')).toBe(true);
    });

    it('should return false if the string contains numbers', () => {
      expect(isOnlyLetters('Apple123')).toBe(false);
    });
  });
});