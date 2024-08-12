import React from 'react';
import ServiceCard from "@patternfly/react-component-groups/dist/dynamic/ServiceCard";
import { Gallery } from '@patternfly/react-core/dist/dynamic/layouts/Gallery';
import { GalleryItem } from '@patternfly/react-core/dist/dynamic/layouts/Gallery';
import { Button, ButtonVariant } from '@patternfly/react-core';
import contentHeaderIcon from '../../assets/icons/content-header-icon.svg';

export const ServiceCardGalleryExample: React.FunctionComponent = () => (
  <Gallery hasGutter minWidths={{ default: '330px' }}>
    <GalleryItem>
      <ServiceCard
        isStacked
        isFullHeight
        title='Example1'
        subtitle='A basic example'
        description='This is a basic ServiceCard example'
        icon={<img src={contentHeaderIcon} alt="content-header-icon" />}
        helperText='Example helper text'
      />
    </GalleryItem>
    <GalleryItem>
      <ServiceCard
        isStacked
        isFullHeight
        title='Example2'
        subtitle='A second example'
        description='This is another basic ServiceCard example'
        icon={<img src={contentHeaderIcon} alt="content-header-icon" />}
        helperText='Example helper text'
        footer={<>
          <Button
            variant={ButtonVariant.secondary}
            className='pf-v6-u-mr-md'
            component="a"
            href='www.patternfly.org'
          >
            Launch
          </Button>
          <Button
            variant={ButtonVariant.link}
            component="a"
            href='www.patternfly.org'
          >
            Learn more
          </Button></>
        }
      />
    </GalleryItem>
  </Gallery>
)