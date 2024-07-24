import React from 'react';
import ServiceCard from "@patternfly/react-component-groups/dist/dynamic/ServiceCard";
import { Gallery } from '@patternfly/react-core/dist/dynamic/layouts/Gallery';
import { GalleryItem } from '@patternfly/react-core/dist/dynamic/layouts/Gallery';


export const ServiceCardGalleryExample: React.FunctionComponent = () => (
  <Gallery hasGutter minWidths={{ default: '330px' }}>
    <GalleryItem>
      <ServiceCard 
        title='Example2'
        subtitle='A basic example'
        description='This is a basic ServiceCard Example'
        iconUrl='/'
        showDisabledButton={false}
        helperText=''
        learnMoreUrl='/'
        launchUrl='/'
      />
    </GalleryItem>
    <GalleryItem>
      <ServiceCard 
        title='Example2'
        subtitle='A second example'
        description='This is another basic ServiceCard Example'
        iconUrl='/'
        showDisabledButton={false}
        helperText=''
        learnMoreUrl='/'
        launchUrl='/'
      />
    </GalleryItem>
  </Gallery>
)