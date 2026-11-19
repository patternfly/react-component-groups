import { fireEvent, render } from '@testing-library/react';
import { Modal } from '@patternfly/react-core';
import Tearsheet, { createStackEscapeHandler, type StackEscapeEntry } from './index';

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
