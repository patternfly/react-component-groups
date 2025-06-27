import { Button, ButtonProps } from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import type { SVGIconProps } from '@patternfly/react-icons/dist/esm/createIcon';
import { forwardRef, Ref } from 'react';

/** extends ButtonProps */
export interface ExternalLinkButtonProps extends ButtonProps {
    /** Additional props to pass to the icon */
    iconProps?: SVGIconProps;
};

export const ExternalLinkButton = forwardRef(({ iconProps, ...props }: ExternalLinkButtonProps, ref: Ref<HTMLAnchorElement>) => (
  <Button
    component="a"
    icon={<ExternalLinkAltIcon {...iconProps} />}
    iconPosition="right"
    ouiaId="ExternalLinkButton"
    ref={ref}
    rel="noopener noreferrer"
    target="_blank"
    {...props}
  />
));

export default ExternalLinkButton;
