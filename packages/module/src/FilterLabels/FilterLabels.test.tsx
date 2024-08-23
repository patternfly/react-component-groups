import React from 'react';
import { render } from '@testing-library/react';
import FilterLabels, { FilterLabelsProps } from './FilterLabels';

describe('FilterLabels component', () => {
  const filters: FilterLabelsProps['filters'] = [
    { text: 'Label 1', count: 5 },
    { text: 'Label 2', count: 2 },
    {
      categoryName: 'Group 1',
      labels: [ { text: 'Label 3' }, { text: 'Label 4', count: 3 } ],
    },
  ];

  it('should render FilterLabels component with default props', () => {
    const { container } = render(
      <FilterLabels 
        filters={filters} 
        onDelete={jest.fn()} 
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render FilterLabels component with custom delete all button title', () => {
    const { container } = render(
      <FilterLabels 
        filters={filters} 
        onDelete={jest.fn()} 
        deleteAllButtonTitle="Remove all filters"
        showDeleteAllButton={true}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render FilterLabels component with delete group button enabled', () => {
    const { container } = render(
      <FilterLabels 
        filters={filters} 
        onDelete={jest.fn()} 
        showDeleteGroupButton={true}
      />
    );
    expect(container).toMatchSnapshot();
  });
});