import {
  formatBudgetAmount,
  formatCurrency,
  calculatePercentage,
  calculateGrowth,
  formatPercentage,
  slugify,
} from '@/lib/utils';

describe('utils', () => {
  describe('formatBudgetAmount', () => {
    it('formats trillions correctly', () => {
      expect(formatBudgetAmount(2500000000000000, 'id-ID')).toBe('2.500 PB');
    });

    it('formats trillions correctly', () => {
      expect(formatBudgetAmount(1500000000000, 'id-ID')).toBe('1.500 T');
    });

    it('formats billions correctly', () => {
      expect(formatBudgetAmount(2500000000, 'id-ID')).toBe('2.500 M');
    });

    it('formats millions correctly', () => {
      expect(formatBudgetAmount(5000000, 'id-ID')).toBe('5 Jt');
    });

    it('formats small amounts as currency', () => {
      expect(formatBudgetAmount(50000, 'id-ID')).toBe('Rp50.000');
    });
  });

  describe('formatCurrency', () => {
    it('formats Indonesian currency correctly', () => {
      expect(formatCurrency(1000000, 'id-ID')).toBe('Rp1.000.000');
    });

    it('handles zero amount', () => {
      expect(formatCurrency(0, 'id-ID')).toBe('Rp0');
    });
  });

  describe('calculatePercentage', () => {
    it('calculates percentage correctly', () => {
      expect(calculatePercentage(25, 100)).toBe(25);
    });

    it('handles zero total', () => {
      expect(calculatePercentage(25, 0)).toBe(0);
    });

    it('handles decimal results', () => {
      expect(calculatePercentage(1, 3)).toBeCloseTo(33.33, 2);
    });
  });

  describe('calculateGrowth', () => {
    it('calculates positive growth', () => {
      expect(calculateGrowth(120, 100)).toBe(20);
    });

    it('calculates negative growth', () => {
      expect(calculateGrowth(80, 100)).toBe(-20);
    });

    it('handles zero previous value', () => {
      expect(calculateGrowth(100, 0)).toBe(0);
    });
  });

  describe('formatPercentage', () => {
    it('formats percentage with default decimals', () => {
      expect(formatPercentage(25.567)).toBe('25.6%');
    });

    it('formats percentage with custom decimals', () => {
      expect(formatPercentage(25.567, 2)).toBe('25.57%');
    });
  });

  describe('slugify', () => {
    it('converts text to slug', () => {
      expect(slugify('Budget ForPublic.id')).toBe('budget-forpublic-id');
    });

    it('handles Indonesian characters', () => {
      expect(slugify('Anggaran Pendidikan')).toBe('anggaran-pendidikan');
    });

    it('removes special characters', () => {
      expect(slugify('Budget & Finance @ 2024!')).toBe('budget-finance-2024');
    });

    it('handles multiple spaces', () => {
      expect(slugify('Multiple   Spaces   Here')).toBe('multiple-spaces-here');
    });
  });
});