/* eslint-disable no-console */
import React, { FunctionComponent, useState } from 'react';
import Deck, { DeckButton } from '@patternfly/react-component-groups/dist/dynamic/Deck';
import { ModalDeck } from '@patternfly/react-component-groups/dist/dynamic/ModalDeck';
import { Button, ButtonVariant, Label, Title, Stack, StackItem, Content } from '@patternfly/react-core';

export const OnboardingModalDeckDemo: FunctionComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
    console.log('Onboarding completed or skipped');
  };

  // Placeholder for illustration - in a real app, replace with actual images
  const placeholderImage = (
    <div 
      style={{
        width: '256px',
        height: '256px',
        borderRadius: '8px',
        background: 'repeating-linear-gradient(45deg, #f3f4f6, #f3f4f6 10px, #e5e7eb 10px, #e5e7eb 20px)',
        opacity: 0.25,
        margin: 'auto'
      }}
    />
  );

  const pages = [
    {
      content: (
        <Stack hasGutter>
          <StackItem>{placeholderImage}</StackItem>
          <StackItem>
            <Title headingLevel="h2" size="2xl">Welcome to [Product Name]</Title>
          </StackItem>
            <StackItem>
                <Content component="p">
                    Harness the full potential of the hybrid cloud, simply by asking.  
                </Content>
            </StackItem>
        </Stack>
      ),
      buttons: [
        {
          children: 'Continue',
          variant: ButtonVariant.primary,
          navigation: 'next'
        }
      ] as DeckButton[]
    },
    {
      content: (
        <Stack hasGutter>
          <StackItem>{placeholderImage}</StackItem>
          <StackItem><Label color="grey">AI Command Center</Label></StackItem>
          <StackItem><Title headingLevel="h2" size="2xl">Intelligence at your command</Title></StackItem>
          <StackItem><Content component="p">Ask anything. Get answers. Troubleshoot, analyze, and understand your entire fleet just by asking. It's the power of your data, in plain language.</Content></StackItem>
        </Stack>
      ),
      buttons: [
        {
          children: 'Continue',
          variant: ButtonVariant.primary,
          navigation: 'next'
        }
      ] as DeckButton[]
    },
    {
      content: (
        <Stack hasGutter>
          <StackItem>{placeholderImage}</StackItem> 
          <StackItem><Label color="grey">Canvas Mode</Label></StackItem>
          <StackItem><Title headingLevel="h2" size="2xl">Go from conversation to clarity.</Title></StackItem>
          <StackItem><Content component="p">Transform answers into custom dashboards. In Canvas Mode, you can effortlessly arrange, customize, and build the precise view you need to monitor what matters most.</Content></StackItem>
        </Stack>
      ),
      buttons: [
        {
          children: 'Continue',
          variant: ButtonVariant.primary,
          navigation: 'next'
        }
      ] as DeckButton[]
    },
    {
      content: (
        <Stack hasGutter>
          <StackItem>{placeholderImage}</StackItem>
          <StackItem><Label color="grey">Sharing</Label></StackItem>
          <StackItem><Title headingLevel="h2" size="2xl">Share your vision. Instantly.</Title></StackItem>
          <StackItem><Content component="p">An insight is only powerful when it’s shared. Save any view to your library and share it with your team in a single click. Drive decisions, together.</Content></StackItem>
        </Stack>
      ),
      buttons: [
        {
          children: 'Get started',
          variant: ButtonVariant.primary,
          navigation: 'close'
        }
      ] as DeckButton[]
    }
  ];

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        Launch onboarding
      </Button>
      <ModalDeck 
        isOpen={isModalOpen}
        modalProps={{
          'aria-label': 'Product onboarding walkthrough'
        }}
      >
        <Deck 
          pages={pages} 
          onClose={handleClose}
          onPageChange={(index) => console.log('Onboarding page:', index + 1)}
          ariaLabel="Product onboarding"
          ariaRoleDescription="onboarding walkthrough"
          contentFlexProps={{
            spaceItems: { default: 'spaceItemsXl' }
          }}
        />
      </ModalDeck>
    </>
  );
};

