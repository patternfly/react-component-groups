/* eslint-disable no-console */
import React, { FunctionComponent, useState } from 'react';
import Deck, { DeckButton } from '@patternfly/react-component-groups/dist/dynamic/Deck';
import { ButtonVariant } from '@patternfly/react-core';

export const BasicExample: FunctionComponent = () => {
  const [deckKey, setDeckKey] = useState(0);

  // Simulated analytics function
  const trackEvent = (eventName, data) => {
    console.log('Analytics:', eventName, data);
  };

  const restartDeck = () => {
    setDeckKey(prev => prev + 1);
    trackEvent('deck_restarted', {});
  };

  const pages = [
    {
      content: (
        <div>
          <p>This is the first page of your informational walkthrough.</p>
        </div>
      ),
      buttons: [
        {
          children: 'Next',
          variant: ButtonVariant.primary,
          navigation: 'next',
          // Custom onClick for analytics - called before navigation
          onClick: () => trackEvent('deck_next_clicked', { from_page: 1 })
        }
      ] as DeckButton[]
    },
    {
      content: (
        <div>
          <p>Continue through your walkthrough.</p>
        </div>
      ),
      buttons: [
        {
          children: 'Next',
          variant: ButtonVariant.primary,
          navigation: 'next',
          onClick: () => trackEvent('deck_next_clicked', { from_page: 2 })
        }
      ] as DeckButton[]
    },
    {
      content: (
        <div>
          <p>You've reached the end of the deck.</p>
        </div>
      ),
      buttons: [
        {
          children: 'Restart',
          variant: ButtonVariant.primary,
          // Restart the deck for demo purposes
          onClick: () => {
            trackEvent('deck_completed', { total_pages: 3 });
            console.log('Deck completed! Restarting...');
            restartDeck();
          }
        }
      ]
    }
  ];

  return (
    <Deck 
      key={deckKey}
      pages={pages} 
      onPageChange={(index) => {
        console.log('Current page:', index);
        trackEvent('deck_page_changed', { page: index + 1 });
      }}
      onClose={() => {
        trackEvent('deck_closed', {});
        console.log('Deck closed');
      }}
    />
  );
};

