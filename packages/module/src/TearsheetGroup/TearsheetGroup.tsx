import { Children, cloneElement, isValidElement, useRef, type FunctionComponent, type ReactElement } from 'react';
import { css } from '@patternfly/react-styles';
import { createUseStyles } from 'react-jss';
import Tearsheet, { type TearsheetProps } from '../Tearsheet';

const useStyles = createUseStyles({
  tearsheetGroup: {
    caretColor: 'red',
  },
});

/** The maximum number of visually distinct stack levels (0, 1, 2). */
const MAX_VISIBLE_LEVELS = 3;

export interface TearsheetGroupProps {
  /** Set of Tearsheets to render inside the group. Render order determines stacking
   * priority — later children stack in front of earlier ones. Only Tearsheets with
   * isOpen={true} participate in the visual stack. */
  children?: React.ReactNode;
  /** Additional classes added to the Tearsheet group. */
  className?: string;
  /** Unique id for the Tearsheet group. */
  id: string;
}

const TearsheetGroup: FunctionComponent<TearsheetGroupProps> = ({
  children,
  className,
  id,
  ...props
}: TearsheetGroupProps) => {
  const classes = useStyles();
  // Track each child's last assigned stack level so closing tearsheets keep
  // their position during the modal exit animation instead of snapping to L0.
  const prevLevelsRef = useRef<Map<number, number>>(new Map());

  const openIndices: number[] = [];
  Children.forEach(children, (child, index) => {
    if (isValidElement(child) && child.type === Tearsheet && (child.props as TearsheetProps).isOpen) {
      openIndices.push(index);
    }
  });

  const totalOpen = openIndices.length;
  const hiddenThreshold = Math.max(0, totalOpen - MAX_VISIBLE_LEVELS);

  const enhancedChildren = Children.map(children, (child, index) => {
    if (!isValidElement(child) || child.type !== Tearsheet) {
      return child;
    }

    const openPosition = openIndices.indexOf(index);

    if (openPosition === -1) {
      // Use the last known level if this tearsheet was previously open, so the
      // modal close animation plays without a conflicting size/position shift.
      // For never-opened tearsheets, prime them at the level they'd occupy if
      // they opened next (the frontmost slot). The tearsheet is invisible at
      // this point, so the pre-sizing has no visual effect — but it prevents a
      // width/height/top transition from firing alongside the modal enter
      // animation when the tearsheet does open.
      const level = prevLevelsRef.current.get(index) ?? Math.min(totalOpen, MAX_VISIBLE_LEVELS - 1);
      return cloneElement<TearsheetProps>(child as ReactElement<TearsheetProps>, {
        stackLevel: level
      });
    }

    // Levels fill from 0 upward: 1 open → L0, 2 open → L0+L1, 3 open → L0+L1+L2.
    // Once all 3 visible slots are used, earlier tearsheets hide behind the stack.
    const stackLevel = openPosition < hiddenThreshold ? -1 : openPosition - hiddenThreshold;
    const isFrontmost = openPosition === totalOpen - 1;

    prevLevelsRef.current.set(index, stackLevel);

    return cloneElement<TearsheetProps>(child as ReactElement<TearsheetProps>, {
      stackLevel,
      disableFocusTrap: !isFrontmost
    });
  });

  return (
    <div id={id} className={css(classes.tearsheetGroup, className)} {...props}>
      {enhancedChildren}
    </div>
  );
};
TearsheetGroup.displayName = 'TearsheetGroup';

export default TearsheetGroup;
