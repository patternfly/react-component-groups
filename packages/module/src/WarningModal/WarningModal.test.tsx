import React from 'react';
import { render } from '@testing-library/react';
import WarningModal from './WarningModal';

describe('WarningModal component', () => {
  const initialProps = {
    onConfirm: jest.fn(),
    children: <>By confirming this action, unsaved data may be lost. Do you want to continue?</>
  };
  
  it('should render', () => {
    const { container } = render(<WarningModal {...initialProps}/>);
    expect(container.firstChild).toMatchSnapshot();
  });
});