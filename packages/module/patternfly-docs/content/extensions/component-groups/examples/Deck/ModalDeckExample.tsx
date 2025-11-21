/* eslint-disable no-console */
import { FunctionComponent, useState } from 'react';
import Deck, { DeckButton } from '@patternfly/react-component-groups/dist/dynamic/Deck';
import { ModalDeck } from '@patternfly/react-component-groups/dist/dynamic/ModalDeck';
import { Button, ButtonVariant } from '@patternfly/react-core';

export const ModalDeckExample: FunctionComponent = () => {
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
    console.log('Modal deck closed');
  };

  const pages = [
    {
      content: (
        <div>
          <h2>Welcome to the Modal Deck</h2>
          <p>This deck is displayed in a modal dialog.</p>
        </div>
      ),
      buttons: [
        {
          children: 'Next',
          variant: ButtonVariant.primary,
          navigation: 'next'
        }
      ] as DeckButton[]
    },
    {
      content: (
        <div>
          <h2>Page 2</h2>
          <p>Navigate through the walkthrough.</p>
        </div>
      ),
      buttons: [
        {
          children: 'Next',
          variant: ButtonVariant.primary,
          navigation: 'next'
        }
      ] as DeckButton[]
    },
    {
      content: (
        <div>
          <h2>Final Page</h2>
          <p>Click Close to finish.</p>
        </div>
      ),
      buttons: [
        {
          children: 'Close',
          variant: ButtonVariant.primary,
          navigation: 'close'
        }
      ] as DeckButton[]
    }
  ];

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        Launch modal deck
      </Button>
      <ModalDeck isOpen={isModalOpen} onClose={handleClose}>
        <Deck 
          pages={pages} 
          onClose={handleClose}
          onPageChange={(index) => console.log('Page changed to:', index + 1)}
        />
      </ModalDeck>
    </>
  );
};

