const TARGET_TICK_COUNT = 4;
const DEFAULT_TICKS = [ 50, 100, 150, 200 ];
const NICE_MULTIPLIERS = [ 1, 2, 2.5, 5, 10 ];

/**
 * Returns evenly spaced whole-number tick values for a chart's dependent axis.
 * The last tick is the first "nice" step that covers `maxValue`, so the axis never extends
 * much beyond the data. Falls back to 50-200 when there is no positive data.
 */
export const getYAxisTicks = (maxValue: number): number[] => {
  if (!Number.isFinite(maxValue) || maxValue <= 0) {
    return [ ...DEFAULT_TICKS ];
  }

  // Counts are whole numbers, so never use a step smaller than 1.
  const rawStep = Math.max(1, maxValue / TARGET_TICK_COUNT);
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const step = NICE_MULTIPLIERS
    .map((multiplier) => multiplier * magnitude)
    .find((candidate) => candidate >= rawStep && Number.isInteger(candidate)) ?? 10 * magnitude;
  const count = Math.ceil(maxValue / step);

  return Array.from({ length: count }, (_, index) => step * (index + 1));
};

/** Compact axis label (for example 1500 becomes "1.5K") so large values fit the axis padding. */
export const formatAxisTick = (value: number): string =>
  new Intl.NumberFormat(undefined, { notation: 'compact' }).format(value);
