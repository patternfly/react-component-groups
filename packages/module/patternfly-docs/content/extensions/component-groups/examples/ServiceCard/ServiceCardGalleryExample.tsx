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
        title='Example1'
        subtitle='A basic example'
        description='This is a basic ServiceCard Example'
        icon={<img src={contentHeaderIcon} alt="content-header-icon" />}
        helperText=''

      />
    </GalleryItem>
    <GalleryItem>
      <ServiceCard
        isStacked
        title='Example2'
        subtitle='A second example'
        description='This is another basic ServiceCard Example'
        icon={<img src={contentHeaderIcon} alt="content-header-icon" />}
        helperText=''
        footer={<>
          <Button
            variant={ButtonVariant.primary}
            isInline
            className='pf-v5-u-mr-md'
            component="a"
            href='www.google.com'>
            Launch
          </Button>
          <Button
            variant={ButtonVariant.link}
            component="a"
            isInline
            href='www.google.com'
          >
            Learn more
          </Button></>
        }
      />
    </GalleryItem>
  </Gallery>
)