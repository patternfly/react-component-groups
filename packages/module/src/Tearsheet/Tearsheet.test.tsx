import { fireEvent, render, screen, within } from '@testing-library/react';
import { Modal } from '@patternfly/react-core';
import pageChromeInset from '@patternfly/react-tokens/dist/esm/t_global_spacer_inset_page_chrome';
import Tearsheet, { createStackEscapeHandler, type StackEscapeEntry } from './index';
import TearsheetHeader from '../TearsheetHeader';
import TearsheetBody from '../TearsheetBody';
import TearsheetFooter from '../TearsheetFooter';

describe('Tearsheet component', () => {
  it('should render the header, body, and footer inside the content wrapper', () => {
    render(
      <Tearsheet isOpen aria-label="Edit settings" data-testid="tearsheet-content">
        <TearsheetHeader title="Settings" />
        <TearsheetBody>Settings content</TearsheetBody>
        <TearsheetFooter>
          <button type="button">Save settings</button>
        </TearsheetFooter>
      </Tearsheet>
    );

    const content = screen.getByTestId('tearsheet-content');
    expect(screen.getByRole('dialog')).toContainElement(content);
    expect(within(content).getByRole('heading', { name: 'Settings' })).toBeInTheDocument();
    expect(within(content).getByText('Settings content')).toBeInTheDocument();
    expect(within(content).getByRole('button', { name: 'Save settings' })).toBeInTheDocument();
  });

  it('should use stack level zero by default', () => {
    render(
      <Tearsheet isOpen aria-label="Settings">
        <TearsheetBody>Settings content</TearsheetBody>
      </Tearsheet>
    );

    expect(screen.getByRole('dialog')).toHaveClass('pf-m-stack-level-0');
  });

  it.each([ [ -1, '0px' ], [ 0, '0px' ], [ 1, '2rem' ], [ 2, '4rem' ] ])(
    'should toggle masthead coverage at stack level %i while preserving its stack offset',
    (stackLevel, expectedOffset) => {
      const renderSheet = (coverMasthead?: boolean) => (
        <Tearsheet isOpen aria-label="Settings" stackLevel={stackLevel} coverMasthead={coverMasthead}>
          <TearsheetBody>Settings content</TearsheetBody>
        </Tearsheet>
      );
      const { rerender } = render(renderSheet());
      const dialog = screen.getByRole('dialog');

      expect(dialog).not.toHaveClass('pf-m-cover-masthead');
      expect(getComputedStyle(dialog).getPropertyValue('--pf-v6-c-tearsheet--InsetBlockStart')).toBe('4rem');

      rerender(renderSheet(true));

      expect(dialog).toHaveClass('pf-m-cover-masthead');
      expect(getComputedStyle(dialog).getPropertyValue('--pf-v6-c-tearsheet--InsetBlockStart')).toBe(pageChromeInset.var);
      expect(getComputedStyle(dialog).getPropertyValue('--pf-v6-c-tearsheet--StackOffset')).toBe(expectedOffset);
      expect(screen.getByText('Settings content').parentElement).not.toHaveAttribute('coverMasthead');

      rerender(renderSheet(false));

      expect(dialog).not.toHaveClass('pf-m-cover-masthead');
      expect(getComputedStyle(dialog).getPropertyValue('--pf-v6-c-tearsheet--InsetBlockStart')).toBe('4rem');
      expect(getComputedStyle(dialog).getPropertyValue('--pf-v6-c-tearsheet--StackOffset')).toBe(expectedOffset);
    }
  );

  it.each([ 1, 2 ])('should apply the visual class for stack level %i', (stackLevel) => {
    render(
      <Tearsheet isOpen aria-label="Settings" stackLevel={stackLevel}>
        <TearsheetBody>Settings content</TearsheetBody>
      </Tearsheet>
    );

    expect(screen.getByRole('dialog')).toHaveClass(`pf-m-stack-level-${stackLevel}`);
  });

  it('should replace the visual stack class when moving behind the stack and back to the front', () => {
    const { rerender } = render(
      <Tearsheet isOpen aria-label="Settings" stackLevel={1}>
        <TearsheetBody>Settings content</TearsheetBody>
      </Tearsheet>
    );

    expect(screen.getByRole('dialog')).toHaveClass('pf-m-stack-level-1');

    rerender(
      <Tearsheet isOpen aria-label="Settings" stackLevel={-1}>
        <TearsheetBody>Settings content</TearsheetBody>
      </Tearsheet>
    );

    expect(screen.getByRole('dialog')).toHaveClass('pf-m-stack-hidden');
    expect(screen.getByRole('dialog')).not.toHaveClass('pf-m-stack-level-1');
    expect(screen.getByRole('dialog')).not.toHaveClass('pf-m-stack-level--1');

    rerender(
      <Tearsheet isOpen aria-label="Settings" stackLevel={2}>
        <TearsheetBody>Settings content</TearsheetBody>
      </Tearsheet>
    );

    expect(screen.getByRole('dialog')).toHaveClass('pf-m-stack-level-2');
    expect(screen.getByRole('dialog')).not.toHaveClass('pf-m-stack-hidden');
  });

  it('should apply custom classes and HTML props to the content wrapper and modalProps to the dialog', () => {
    render(
      <Tearsheet
        isOpen
        aria-label="Settings"
        className="custom-content"
        id="settings-content"
        title="Settings content"
        modalProps={{ id: 'settings-dialog' }}
      >
        <TearsheetBody>Settings content</TearsheetBody>
      </Tearsheet>
    );

    const content = screen.getByTitle('Settings content');
    const dialog = screen.getByRole('dialog');
    expect(content).toHaveClass('custom-content');
    expect(content).toHaveAttribute('id', 'settings-content');
    expect(content).toHaveAttribute('title', 'Settings content');
    expect(dialog).toContainElement(content);
    expect(dialog).toHaveAttribute('id', 'settings-dialog');
    expect(dialog).not.toHaveClass('custom-content');
    expect(dialog).not.toHaveAttribute('title');
  });
});

describe('createStackEscapeHandler', () => {
  it.each<StackEscapeEntry[][]>([
    [ [] ],
    [ [ { isOpen: false, onEscapePress: jest.fn() } ] ]
  ])('leaves events untouched when no entries are open (%j)', (entries) => {
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    const stopPropagation = jest.spyOn(event, 'stopImmediatePropagation');

    createStackEscapeHandler(entries)(event);

    expect(stopPropagation).not.toHaveBeenCalled();
    entries.forEach((entry) => expect(entry.onEscapePress).not.toHaveBeenCalled());
  });

  it('dispatches Escape once to the topmost open Modal or Tearsheet using current state', () => {
    const closeBase = jest.fn();
    const closeDetails = jest.fn();
    const closeModal = jest.fn();
    const renderStack = (isDetailsOpen: boolean, isModalOpen: boolean) => {
      const onEscapePress = createStackEscapeHandler([
        { isOpen: true, onEscapePress: closeBase },
        { isOpen: isDetailsOpen, onEscapePress: closeDetails },
        { isOpen: isModalOpen, onEscapePress: closeModal }
      ]);

      return (
        <>
          <Tearsheet isOpen aria-label="Base" onClose={closeBase} onEscapePress={onEscapePress}>
            Base content
          </Tearsheet>
          <Tearsheet isOpen={isDetailsOpen} aria-label="Details" onClose={closeDetails} onEscapePress={onEscapePress}>
            Details content
          </Tearsheet>
          <Modal isOpen={isModalOpen} aria-label="File picker" onClose={closeModal} onEscapePress={onEscapePress}>
            File picker content
          </Modal>
        </>
      );
    };

    const { rerender } = render(renderStack(true, true));

    // The callback intentionally leaves the Modal open; underlying sheets stay protected.
    fireEvent.keyDown(document.body, { key: 'Escape' });
    expect(closeModal).toHaveBeenCalledTimes(1);
    expect(closeModal).toHaveBeenCalledWith(expect.objectContaining({ key: 'Escape' }));
    expect(closeDetails).not.toHaveBeenCalled();
    expect(closeBase).not.toHaveBeenCalled();

    rerender(renderStack(true, false));
    fireEvent.keyDown(document.body, { key: 'Escape' });
    expect(closeDetails).toHaveBeenCalledTimes(1);
    expect(closeBase).not.toHaveBeenCalled();
    expect(closeModal).toHaveBeenCalledTimes(1);

    rerender(renderStack(false, false));
    fireEvent.keyDown(document.body, { key: 'Escape' });
    expect(closeBase).toHaveBeenCalledTimes(1);
    expect(closeDetails).toHaveBeenCalledTimes(1);
    expect(closeModal).toHaveBeenCalledTimes(1);
  });
});
