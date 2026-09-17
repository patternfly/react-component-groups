import { NudgeMetric } from './ProductNudge.types';

// Replaces {{key}} tokens in a NudgeContact.messageTemplate with metric
// values, keyed by NudgeMetric.key. Metrics without a key are ignored for
// interpolation purposes. Unresolved tokens are left as-is rather than
// throwing, so a content author error is visible in the prefilled text
// instead of breaking the modal.
export const interpolateMessageTemplate = (template: string, metrics: NudgeMetric[] = []) => {
  const valuesByKey = new Map(
    metrics.filter((metric) => metric.key).map((metric) => [metric.key, metric.value]),
  );

  return template.replace(/{{\s*([\w-]+)\s*}}/g, (match, key) =>
    valuesByKey.has(key) ? String(valuesByKey.get(key)) : match,
  );
};
