import React from 'react';
import { render } from '@testing-library/react';
import Battery, { BatterySeverity } from './Battery';

describe('Battery component', () => {
  jest.spyOn(global.console, 'error');
  describe('should render correctly', () => {
    ([ 'critical', 4 ] as BatterySeverity[]).forEach((severity) => {
      test(`CriticalBattery - ${severity}`, () => {
        const { container } = render(<Battery severity={severity as BatterySeverity} label={`${severity}`} />);
        expect(container).toMatchSnapshot();
      });
    });

    ([ 'high', 'error', 3 ] as BatterySeverity[]).forEach((severity) => {
      test(`HighBattery - ${severity}`, () => {
        const { container } = render(<Battery severity={severity as BatterySeverity} label={`${severity}`} />);
        expect(container).toMatchSnapshot();
      });
    });

    ([ 'medium', 'warn', 2 ] as BatterySeverity[]).forEach((severity) => {
      test(`MediumBattery - ${severity}`, () => {
        const { container } = render(<Battery severity={severity as BatterySeverity} label={`${severity}`} />);
        expect(container).toMatchSnapshot();
      });
    });

    ([ 'low', 'info', 1 ] as BatterySeverity[]).forEach((severity) => {
      test(`LowBattery - ${severity}`, () => {
        const { container } = render(<Battery severity={severity} label={`${severity}`} />);
        expect(container).toMatchSnapshot();
      });
    });

    test('NullBatery, default', () => {
      const { container } = render(<Battery severity={'' as BatterySeverity} label={''} />);
      expect(container).toMatchSnapshot();
      // eslint-disable-next-line no-console
      expect(console.error).toBeCalled();
    });
  });

  describe('API', () => {
    test('should hide label', () => {
      const { container } = render(<Battery severity={'high'} label={'high'} labelHidden />);
      expect(container).toMatchSnapshot();
    });
  });
});
