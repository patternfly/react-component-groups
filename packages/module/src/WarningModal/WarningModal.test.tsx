import React from 'react';
import { render } from '@testing-library/react';
import WarningModal from './WarningModal';

describe('WarningModal component', () => {
  const initialProps = {
    title: 'Unsaved changes',
    onClose: () => null,
    onConfirm: () => null,
    confirmCheckMessage: 'hi there',
  };
  
  it('should render', () => {
    const container = render(<WarningModal isOpen={true} {...initialProps}>Warning modal content</WarningModal>);
    expect(container).toMatchSnapshot();
  });
});