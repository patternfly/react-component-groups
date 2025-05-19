import { FunctionComponent } from 'react';
import PageHeader from '@patternfly/react-component-groups/dist/dynamic/PageHeader';
import pageHeaderIcon from '../../assets/icons/page-header-icon.svg';

export const IconExample: FunctionComponent = () => (
  <PageHeader
    title="My Title"
    subtitle="This is a subtitle for your page header"
    icon={<img src={pageHeaderIcon} alt="page-header-icon" />}
  />
);
