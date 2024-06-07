import React from 'react';
import { render } from '@testing-library/react';
import BulkSelect from './BulkSelect';

describe('BulkSelect component', () => {
  test('should render', () => {
    expect(render(
      <BulkSelect
        canSelectAll
        pageCount={5}
        totalCount={10}
        selectedCount={2}
        pageSelected={false}
        pagePartiallySelected={true}
        onSelect={() => null}
      />)).toMatchSnapshot();
  });
});