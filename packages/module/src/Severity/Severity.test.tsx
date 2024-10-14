import React from 'react';
import { render } from '@testing-library/react';
import Severity, { SeverityType } from './Severity';

describe('Severity component', () => {
  jest.spyOn(global.console, 'error');
  describe('should render correctly', () => {

    test('CriticalSeverity', () => {
      const { container } = render(<Severity severity={SeverityType.critical} label="Critical" />);
      expect(container).toMatchSnapshot();
    });
  
    test('HighSeverity', () => {
      const { container } = render(<Severity severity={SeverityType.important} label="Important" />);
      expect(container).toMatchSnapshot();
    });

    test('MediumSeverity', () => {
      const { container } = render(<Severity severity={SeverityType.moderate} label="Moderate" />);
      expect(container).toMatchSnapshot();
    });

    test('LowSeverity', () => {
      const { container } = render(<Severity severity={SeverityType.minor} label="Minor" />);
      expect(container).toMatchSnapshot();
    });

    test('LowSeverity', () => {
      const { container } = render(<Severity severity={SeverityType.none} label="None" />);
      expect(container).toMatchSnapshot();
    });
    test('UndefinedSeverity, default', () => {
      const { container } = render(<Severity severity={'' as SeverityType} label={''} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('API', () => {
    test('should hide label', () => {
      const { container } = render(<Severity severity={SeverityType.important} label="important" labelHidden />);
      expect(container).toMatchSnapshot();
    });
  });
});