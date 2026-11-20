import { formatAxisTick, getYAxisTicks } from './productNudgeChartUtils';

describe('getYAxisTicks', () => {
  it.each([
    [ 804, [ 250, 500, 750, 1000 ] ],
    [ 180, [ 50, 100, 150, 200 ] ],
    [ 200, [ 50, 100, 150, 200 ] ],
    [ 350, [ 100, 200, 300, 400 ] ],
    [ 1001, [ 500, 1000, 1500 ] ],
    [ 3, [ 1, 2, 3 ] ],
    [ 9, [ 5, 10 ] ],
    [ 12500, [ 5000, 10000, 15000 ] ],
  ])('covers a max of %s without overshooting', (max, expected) => {
    expect(getYAxisTicks(max)).toEqual(expected);
  });

  it.each([ 0, -5, NaN, Infinity ])('falls back to the default ticks for %s', (max) => {
    expect(getYAxisTicks(max)).toEqual([ 50, 100, 150, 200 ]);
  });

  it('always ends at the first tick that covers the max and uses whole numbers', () => {
    for (let max = 1; max <= 5000; max += 7) {
      const ticks = getYAxisTicks(max);
      const step = ticks[0];
      expect(ticks[ticks.length - 1]).toBeGreaterThanOrEqual(max);
      expect(ticks[ticks.length - 1] - step).toBeLessThan(max);
      expect(ticks.every(Number.isInteger)).toBe(true);
    }
  });

  it('returns a new array each call so callers cannot mutate the defaults', () => {
    getYAxisTicks(0).push(999);
    expect(getYAxisTicks(0)).toEqual([ 50, 100, 150, 200 ]);
  });
});

describe('formatAxisTick', () => {
  it('uses compact notation for large values', () => {
    expect(formatAxisTick(250)).toBe('250');
    expect(formatAxisTick(1000)).toBe('1K');
    expect(formatAxisTick(1500)).toBe('1.5K');
  });
});
