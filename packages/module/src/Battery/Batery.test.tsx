import React from 'react';
import { render } from '@testing-library/react';
import Battery, { BatterySeverity } from './Battery';

describe('Battery component', () => {
  jest.spyOn(global.console, 'error');
  describe('should render correctly', () => {

    test('CriticalBattery', () => {
      const { container } = render(<Battery severity={BatterySeverity.critical} label="Critical" />);
      expect(container).toMatchSnapshot();
    });
  
    test('HighBattery', () => {
      const { container } = render(<Battery severity={BatterySeverity.high} label="High" />);
      expect(container).toMatchSnapshot();
    });

    test('MediumBattery', () => {
      const { container } = render(<Battery severity={BatterySeverity.medium} label="Medium" />);
      expect(container).toMatchSnapshot();
    });

    test('LowBattery', () => {
      const { container } = render(<Battery severity={BatterySeverity.low} label="Low" />);
      expect(container).toMatchSnapshot();
    });

    test('NullBatery, default', () => {
      const { container } = render(<Battery severity={'' as BatterySeverity} label={''} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('API', () => {
    test('should hide label', () => {
      const { container } = render(<Battery severity={BatterySeverity.high} label="high" labelHidden />);
      expect(container).toMatchSnapshot();
    });
  });
});
