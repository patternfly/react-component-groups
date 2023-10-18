import React, { useState } from 'react';
import clsx from 'clsx';
import { Button, Stack, StackItem } from '@patternfly/react-core';
import sanitizeHtml from 'sanitize-html';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  expandableText: {
    "& button": {
      padding: "0"
    },
    "& is-inline": { marginRight: [ "10px", "0.625rem" ] }
  } });

const dangerousHtml = (html: string) => ({ __html: sanitizeHtml(html) });

export interface ExpandableTextCustomButtonProps {
  /** Allows a user to add a custom expand button */
  expand: React.ReactNode;
  /** Allows a user to add a custom collapse button */
  collapse: React.ReactNode;
}

export interface ExpandableTextProps {
  /** Additional classes added to the ExpandableText */
  className?: string;
  /** Text to display in the ExpandableText component */
  text?: string;
  /** A set length for the ExpandableText component. */
  length?: number;
  /** Indicates if the text should be kept inline */
  inline?: boolean;
  /** If set to true the expand text will be hidden */
  hideExpandText?: boolean;
  /** If set to true the text will be expanded when moused over */
  expandOnMouseOver?: boolean;
  /** Allows users to create custom expandable buttons */
  customButton?: ExpandableTextCustomButtonProps;
}

const ExpandableText: React.FunctionComponent<ExpandableTextProps> = ({
  text = '',
  length = 150,
  hideExpandText = false,
  expandOnMouseOver = false,
  className,
  inline,
  customButton,
  ...props
}: ExpandableTextProps) => {
  const classes = useStyles();
  const expandableTextClasses = clsx(classes.expandableText, className, { [`isInline`]: inline });
  const trimmedText = text.substring(0, length);
  const textOverflow = text.length > length;
  const [ showText, setShowText ] = useState(false);
  const toggleText = (event: React.MouseEvent<HTMLButtonElement>) => {
    event && event.preventDefault();
    setShowText(!showText);
  };

  const cloneButton = (button: React.ReactNode) => React.isValidElement(button) ? React.cloneElement(button as React.ReactElement, { onClick: toggleText }) : 
    <Button variant='link' onClick={toggleText}>
      {button}
    </Button>;

  const expandButton = 
    (customButton ? cloneButton(customButton.expand) : <Button variant='link' onClick={toggleText}>
      Read more
    </Button> );
  const collapseButton =
    (customButton ? cloneButton(customButton.collapse) : <Button variant='link' onClick={toggleText}>
      Collapse
    </Button> );
  const textWithOverflow = showText === false ? `${trimmedText}${textOverflow ? '...' : ''}` : text;
  const html = dangerousHtml(textWithOverflow);
  const mouseOverHandler = expandOnMouseOver && {
    onMouseEnter: () => setShowText(true),
    onMouseLeave: () => setShowText(false),
  };

  return inline ? (
    <React.Fragment>
      <span className={expandableTextClasses} dangerouslySetInnerHTML={html} {...mouseOverHandler} {...props} />
      {!hideExpandText && textOverflow && (showText ? collapseButton : expandButton)}
    </React.Fragment>
  ) : (
    <Stack className={expandableTextClasses} {...props}>
      <StackItem {...mouseOverHandler}>
        <span dangerouslySetInnerHTML={html} />
      </StackItem>
      {!hideExpandText && textOverflow && 
        <StackItem>
          {showText === false ? expandButton : collapseButton}
        </StackItem>
      }
    </Stack>
  );
};

export default ExpandableText;
