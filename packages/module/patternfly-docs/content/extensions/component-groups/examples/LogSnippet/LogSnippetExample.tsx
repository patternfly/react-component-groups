import React from 'react';
import LogSnippet from '@patternfly/react-component-groups/dist/dynamic/LogSnippet';

export const BasicExample: React.FunctionComponent = () => {
  const code = `apiVersion: helm.openshift.io/v1beta1/
  kind: HelmChartRepository
  metadata:
  name: azure-sample-repo
  spec:
  connectionConfig:
  url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs`;

  return <LogSnippet message='Failure - check logs for details' logSnippet={code} />;
}