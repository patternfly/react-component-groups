import React from 'react';
import { Button, ButtonProps } from '@patternfly/react-core';

export interface ExtendedButtonProps extends ButtonProps {
  /** Content to render inside the extended button component */
  children?: React.ReactNode;
}

export const ExtendedButton: React.FunctionComponent<ExtendedButtonProps> = ({
  children,
  ...props
}: ExtendedButtonProps) => {
  const [currentVariantIndex, setCurrentVariantIndex] = React.useState(0);

  const buttonVariants: ButtonProps['variant'][] = [
    'primary',
    'secondary',
    'tertiary'
  ];

  const handleClick = () => {
    setCurrentVariantIndex((previousVariantIndex) => (previousVariantIndex + 1) % buttonVariants.length);
  };

  return (
    <Button onClick={handleClick} variant={buttonVariants[currentVariantIndex]} {...props}>
      {children}
    </Button>
  );
};
