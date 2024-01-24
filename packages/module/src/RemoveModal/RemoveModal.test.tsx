import React from 'react';
import { render } from '@testing-library/react';
import RemoveModal from './RemoveModal';

describe('RemoveModal component', () => {
  const initialProps = {
    title: 'Delete Item',
    text: 'do you want to delete?',
    confirmButtonLabel: '',
    confirmCheckMessage: 'checked',
    onClose: () => null,
    onConfirm: () => null,
    onSubmit: () => null,
    withCheckbox: false,
  };
  
  it('should render', () => {
    const container = render(<RemoveModal isOpen={true} {...initialProps}>delete?</RemoveModal>);
    expect(container).toMatchSnapshot();
  });
});