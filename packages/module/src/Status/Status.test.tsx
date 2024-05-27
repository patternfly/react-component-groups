import React from 'react';
import { render } from '@testing-library/react';
import Status, { StatusVariant } from './Status';
import { BanIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@patternfly/react-icons';
import { Button, ButtonSize, ButtonVariant } from '@patternfly/react-core';

describe('Status component', () => {
  it('should render correctly', () => {
    expect(render(<Status label='Warning' icon={<ExclamationTriangleIcon color='var(--pf-v5-global--warning-color--100)'/>}/>)).toMatchSnapshot();
  });

  it('should render iconOnly correctly', () => {
    expect(render(<Status iconOnly label='Warning' icon={<ExclamationTriangleIcon color='var(--pf-v5-global--warning-color--100)'/>} />)).toMatchSnapshot();
  });

  it('should render correctly with description', () => {
    expect(render(<Status label='Warning' description='1 issue found' icon={<ExclamationTriangleIcon color='var(--pf-v5-global--warning-color--100)'/>}/>)).toMatchSnapshot();
  });

  it('should render correctly link', () => {
    // eslint-disable-next-line no-console
    expect(render(<Status variant={StatusVariant.link} label='Ready' onClick={() => console.log('Link status clicked')} icon={<CheckCircleIcon color='var(--pf-v5-global--success-color--100)'/>}/>)).toMatchSnapshot();
  });

  it('should render correctly popover', () => {
    expect(render(<Status 
      variant={StatusVariant.popover} 
      label='Not Ready' 
      icon={<BanIcon color='var(--pf-v5-global--danger-color--100)'/>}
      popoverProps={{ 
        bodyContent: 'Example state description', 
        footerContent: <Button size={ButtonSize.sm} variant={ButtonVariant.link} isInline>Action</Button> 
      }}
    />)).toMatchSnapshot();
  });
});
