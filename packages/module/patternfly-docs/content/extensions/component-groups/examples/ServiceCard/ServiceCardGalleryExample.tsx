import React from 'react';
import ServiceCard from "@patternfly/react-component-groups/dist/dynamic/ServiceCard";
import { Gallery } from '@patternfly/react-core/dist/dynamic/layouts/Gallery';
import { GalleryItem } from '@patternfly/react-core/dist/dynamic/layouts/Gallery';
import { Button, ButtonVariant } from '@patternfly/react-core';
import pageHeaderIcon from '../../assets/icons/page-header-icon.svg';

export const ServiceCardGalleryExample: React.FunctionComponent = () => (
  <Gallery hasGutter minWidths={{ default: '330px' }}>
    <GalleryItem>
      <ServiceCard
        isStacked
        title='Example1'
        subtitle='A basic example'
        description='This is a basic ServiceCard example'
        icon={<img src={pageHeaderIcon} alt="page-header-icon" />}
        helperText='Example helper text'
      />
    </GalleryItem>
    <GalleryItem>
      <ServiceCard
        isStacked
        title='Example2'
        subtitle='A second example'
        description='This is another basic ServiceCard example'
        icon={<img src={pageHeaderIcon} alt="page-header-icon" />}
        helperText='Example helper text'
        footer={
          <>
            <Button
              variant={ButtonVariant.secondary}
              className='pf-v6-u-mr-md'
              component='a'
              href='https://patternfly.org'
              target='_blank'
            >
            Launch
            </Button>
            <Button
              variant={ButtonVariant.link}
              component='a'
              href='https://patternfly.org'
              target='_blank'
            >
            Learn more
            </Button>
          </>
        }
      />
    </GalleryItem>
  </Gallery>
)