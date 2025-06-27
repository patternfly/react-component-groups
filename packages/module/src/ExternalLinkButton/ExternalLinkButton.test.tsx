import { ExternalLinkButton } from './ExternalLinkButton';
import { render } from '@testing-library/react';

describe('ExternalLinkButton component', () => {
  test('should render', () => {
    expect(render(<ExternalLinkButton />)).toMatchSnapshot();
  });

  test('should accept IconProps', () => {
    expect(render(<ExternalLinkButton iconProps={{ className: "my-external-link-icon", title: "(Opens in new tab)" }} />)).toMatchSnapshot();
  });
});
