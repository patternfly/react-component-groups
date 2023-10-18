import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExpandableText from './ExpandableText';

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
laborum.`;

describe('ExpandableText component', () => {
  describe('should render correctly', () => {
    [ true, false ].forEach((isInline) => {
      describe(isInline ? 'inline' : 'block', () => {
        it('without length specified', () => {
          expect(render(<ExpandableText text={text} inline={isInline} />)).toMatchSnapshot();
        });

        it('with short length', () => {
          expect(render(<ExpandableText text={text} length={2} />)).toMatchSnapshot();
        });

        it('clicking on expand toggles to collapse', () => {
          render(<ExpandableText text={text} inline={isInline} customButton={{ expand: "Custom expand", collapse: "Custom collapse" }} />);
          userEvent.click(screen.getByRole('button'));

          expect(screen.getByRole('button')).toMatchSnapshot();
        });

        it('custom expanded button', () => {
          expect(render(<ExpandableText text={text} inline={isInline} customButton={{ expand: "Custom expand", collapse:"Custom collapse" }} />)).toMatchSnapshot();
        });

        it('custom button titles', () => {
          render(<ExpandableText text={text} inline={isInline} customButton={{ expand: "Custom expand", collapse: "Custom collapse" }} />);
          userEvent.click(screen.getByRole('button'));
          expect(screen.getByRole('button')).toMatchSnapshot();
        });

        it('clicking on expand toggles to collapse', () => {
          render(<ExpandableText text={text} inline={isInline} customButton={{ expand: "Custom expand", collapse: "Custom collapse" }} />);
          userEvent.click(screen.getByRole('button'));
          expect(screen.getByRole('button')).toMatchSnapshot();
        });

        it('custom expanded button', () => {
          expect(render(<ExpandableText text={text} inline={isInline} customButton={{ expand: "Custom expand", collapse: "Custom collapse" }} />)).toMatchSnapshot();
        });

        it('custom button titles', () => {
          render(<ExpandableText text={text} inline={isInline} customButton={{ expand: "Custom expand", collapse: "Custom collapse" }} />);
          userEvent.click(screen.getByRole('button'));
          expect(screen.getByRole('button')).toMatchSnapshot();
        });

        it('when text length is less than user specified length', () => {
          expect(render(<ExpandableText text={text} inline={isInline} length={1000} />)).toMatchSnapshot();
        });

        it('hovering over toggles to collapse', () => {
          const wrapper = render(<ExpandableText data-testid="expandable-text-hover" length={50} inline={isInline} text={text} expandOnMouseOver hideExpandText />);
          expect(wrapper).toMatchSnapshot();

          const expandedText = screen.getByTestId('expandable-text-hover');
          
          userEvent.hover(expandedText);
          expect(screen.getByTestId('expandable-text-hover')).toMatchSnapshot();

          userEvent.unhover(expandedText);
          expect(screen.getByTestId('expandable-text-hover')).toMatchSnapshot();
        });
      });
    });
  });
});
