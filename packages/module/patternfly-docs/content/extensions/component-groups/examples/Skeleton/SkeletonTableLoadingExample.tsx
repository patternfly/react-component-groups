import React, { useState } from 'react';
import SkeletonTable from '@patternfly/react-core/dist/js/components/Skeleton/SkeletonTable';
import { Table, Tbody, Td, Th, Tr, Thead } from '@patternfly/react-table';
import { Button, Stack, StackItem } from '@patternfly/react-core';

interface Repository {
  name: string;
  branches: string | null;
  prs: string | null;
  workspaces: string;
  lastCommit: string;
}

export const SkeletonTableExample: React.FC = () => {
  const [ isLoaded, setIsLoaded ] = React.useState(false);

  const simulatedAsyncCall = new Promise<boolean>((resolve) => {
    setTimeout(() => {
      console.log('Network call complete successfully so return true');
      resolve(true);
    }, 5000);
  });

  const loadData = async () => {
    const result = await simulatedAsyncCall;
    setIsLoaded(result);
  };

  const repositories: Repository[] = [
    { name: 'one', branches: 'two', prs: 'three', workspaces: 'four', lastCommit: 'five' },
    { name: 'one - 2', branches: null, prs: null, workspaces: 'four - 2', lastCommit: 'five - 2' },
    { name: 'one - 3', branches: 'two - 3', prs: 'three - 3', workspaces: 'four - 3', lastCommit: 'five - 3' }
  ];

  const columnNames = {
    name: 'Repositories',
    branches: 'Branches',
    prs: 'Pull requests',
    workspaces: 'Workspaces',
    lastCommit: 'Last commit'
  };

  let table: React.ReactNode;

  if (!isLoaded) {
    table = (
      <SkeletonTable
        rows={3}
        columns={[
          columnNames.name,
          columnNames.branches,
          columnNames.prs,
          columnNames.workspaces,
          columnNames.lastCommit
        ]}
      />
    );
  } else {
    table = (
      <Table>
        <Thead>
          <Tr>
            <Th>{columnNames.name}</Th>
            <Th>{columnNames.branches}</Th>
            <Th>{columnNames.prs}</Th>
            <Th>{columnNames.workspaces}</Th>
            <Th>{columnNames.lastCommit}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {repositories.map((repo) => (
            <Tr key={repo.name}>
              <Td dataLabel={columnNames.name}>{repo.name}</Td>
              <Td dataLabel={columnNames.branches}>{repo.branches}</Td>
              <Td dataLabel={columnNames.prs}>{repo.prs}</Td>
              <Td dataLabel={columnNames.workspaces}>{repo.workspaces}</Td>
              <Td dataLabel={columnNames.lastCommit}>{repo.lastCommit}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  }

  return (
    <>
      <Stack hasGutter>
        <StackItem>{table}</StackItem>
        <StackItem>
          <Button
            onClick={() => {
              setIsLoaded(false);
              loadData();
            }}
          >
            Load Table
          </Button>
        </StackItem>
      </Stack>
    </>
  );
};
