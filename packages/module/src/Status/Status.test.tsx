import React from 'react';
import { render } from '@testing-library/react';
import Status, { IconStatus, StatusVariant } from './Status';
import { BanIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@patternfly/react-icons';
import { Button, ButtonSize, ButtonVariant } from '@patternfly/react-core';

describe('Status component', () => {
  it('should render correctly', () => {
    expect(render(<Status status={IconStatus.warning} label='Warning' icon={<ExclamationTriangleIcon/>}/>)).toMatchSnapshot();
  });

  it('should render iconOnly correctly', () => {
    expect(render(<Status iconOnly status={IconStatus.warning} iconTitle='1 security issue found' label='Warning' icon={<ExclamationTriangleIcon/>} />)).toMatchSnapshot();
  });

  it('should render correctly with description', () => {
    expect(render(<Status status={IconStatus.warning} label='Warning' description='1 issue found' icon={<ExclamationTriangleIcon/>}/>)).toMatchSnapshot();
  });

  it('should render correctly link', () => {
    // eslint-disable-next-line no-console
    expect(render(<Status status={IconStatus.success} variant={StatusVariant.link} label='Ready' onClick={() => console.log('Link status clicked')} icon={<CheckCircleIcon/>}/>)).toMatchSnapshot();
  });

  it('should render correctly popover', () => {
    expect(render(<Status
      status={IconStatus.danger}
      variant={StatusVariant.popover} 
      label='Not Ready' 
      icon={<BanIcon/>}
      popoverProps={{ 
        bodyContent: 'Example state description', 
        footerContent: <Button size={ButtonSize.sm} variant={ButtonVariant.link} isInline>Action</Button> 
      }}
    />)).toMatchSnapshot();
  });
});
