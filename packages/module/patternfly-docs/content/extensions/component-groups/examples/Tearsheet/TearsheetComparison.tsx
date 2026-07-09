import { Fragment, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CodeBlock,
  CodeBlockCode,
  Content,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Flex,
  Grid,
  GridItem,
  JumpLinks,
  JumpLinksItem,
  Label,
  LabelGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalVariant,
  PageSection,
  SearchInput,
  Sidebar,
  SidebarContent,
  SidebarPanel
} from '@patternfly/react-core';
import Tearsheet from '@patternfly/react-component-groups/dist/dynamic/Tearsheet';
import TearsheetHeader from '@patternfly/react-component-groups/dist/dynamic/TearsheetHeader';
import TearsheetBody from '@patternfly/react-component-groups/dist/dynamic/TearsheetBody';
import TearsheetFooter from '@patternfly/react-component-groups/dist/dynamic/TearsheetFooter';

const SIDEBAR_FIX_CLASS = 'tearsheet-comparison-sidebar';
const sidebarFixStyles = `
  .${SIDEBAR_FIX_CLASS} .pf-v6-c-sidebar__main { height: 100%; }
  .${SIDEBAR_FIX_CLASS} .pf-v6-c-sidebar__content { overflow: scroll; height: 100%; }
`;

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ' +
  'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ' +
  'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
  'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id ' +
  'est laborum.';

const sections = [
  {
    id: 'overview',
    title: 'Overview',
    description: 'High-level summary of the resource, including its purpose, current state, and key metadata.',
    labels: [ 'v1', 'stable', 'core' ],
    items: [
      { name: 'ConfigMap', status: 'Active', created: '2025-06-01', owner: 'platform-team' },
      { name: 'Secret', status: 'Active', created: '2025-06-02', owner: 'security-team' },
      { name: 'ServiceAccount', status: 'Active', created: '2025-05-28', owner: 'platform-team' },
      { name: 'Namespace', status: 'Terminating', created: '2025-04-15', owner: 'admin' },
      { name: 'LimitRange', status: 'Active', created: '2025-06-03', owner: 'ops-team' },
      { name: 'ResourceQuota', status: 'Active', created: '2025-06-03', owner: 'ops-team' }
    ],
    code: `apiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: my-config\n  namespace: default\n  labels:\n    app.kubernetes.io/name: my-app\n    app.kubernetes.io/version: "1.2.0"\n    app.kubernetes.io/managed-by: helm\ndata:\n  APP_ENV: production\n  LOG_LEVEL: info\n  MAX_CONNECTIONS: "100"`
  },
  {
    id: 'configuration',
    title: 'Configuration',
    description: 'Runtime parameters, feature flags, and environment-specific settings that control application behavior.',
    labels: [ 'apps/v1', 'deployment', 'rolling-update' ],
    items: [
      { name: 'Deployment', status: 'Available', created: '2025-06-01', owner: 'dev-team' },
      { name: 'StatefulSet', status: 'Ready', created: '2025-06-01', owner: 'data-team' },
      { name: 'DaemonSet', status: 'Scheduled', created: '2025-05-30', owner: 'infra-team' },
      { name: 'ReplicaSet', status: 'Available', created: '2025-06-01', owner: 'dev-team' },
      { name: 'CronJob', status: 'Suspended', created: '2025-05-20', owner: 'batch-team' },
      { name: 'Job', status: 'Complete', created: '2025-06-04', owner: 'batch-team' }
    ],
    code: `spec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: my-app\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 0\n  template:\n    spec:\n      containers:\n        - name: app\n          image: registry.io/my-app:1.2.0\n          env:\n            - name: DB_HOST\n              valueFrom:\n                secretKeyRef:\n                  name: db-credentials\n                  key: host`
  },
  {
    id: 'resources',
    title: 'Resources',
    description: 'CPU, memory, and storage allocations for each container in the workload.',
    labels: [ 'requests', 'limits', 'QoS: Burstable' ],
    items: [
      { name: 'app', status: 'Running', created: '2025-06-01', owner: 'dev-team' },
      { name: 'sidecar-proxy', status: 'Running', created: '2025-06-01', owner: 'mesh-team' },
      { name: 'log-collector', status: 'Running', created: '2025-06-01', owner: 'observability' },
      { name: 'init-db', status: 'Completed', created: '2025-06-01', owner: 'dev-team' },
      { name: 'init-config', status: 'Completed', created: '2025-06-01', owner: 'platform-team' },
      { name: 'debug', status: 'Waiting', created: '2025-06-05', owner: 'sre-team' }
    ],
    code: `containers:\n  - name: app\n    resources:\n      requests:\n        cpu: "250m"\n        memory: "512Mi"\n        ephemeral-storage: "1Gi"\n      limits:\n        cpu: "1"\n        memory: "1Gi"\n        ephemeral-storage: "2Gi"\n  - name: sidecar-proxy\n    resources:\n      requests:\n        cpu: "100m"\n        memory: "128Mi"\n      limits:\n        cpu: "200m"\n        memory: "256Mi"`
  },
  {
    id: 'networking',
    title: 'Networking',
    description: 'Service exposure, ingress rules, and network policies governing traffic flow.',
    labels: [ 'ClusterIP', 'Ingress', 'NetworkPolicy' ],
    items: [
      { name: 'my-service', status: 'Active', created: '2025-06-01', owner: 'dev-team' },
      { name: 'my-service-headless', status: 'Active', created: '2025-06-01', owner: 'data-team' },
      { name: 'ingress-main', status: 'Synced', created: '2025-06-02', owner: 'platform-team' },
      { name: 'netpol-deny-all', status: 'Enforcing', created: '2025-05-15', owner: 'security-team' },
      { name: 'netpol-allow-web', status: 'Enforcing', created: '2025-05-15', owner: 'security-team' },
      { name: 'external-dns', status: 'Active', created: '2025-06-03', owner: 'infra-team' }
    ],
    code: `apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: my-ingress\n  annotations:\n    nginx.ingress.kubernetes.io/rewrite-target: /\n    cert-manager.io/cluster-issuer: letsencrypt\nspec:\n  tls:\n    - hosts:\n        - app.example.com\n      secretName: app-tls\n  rules:\n    - host: app.example.com\n      http:\n        paths:\n          - path: /api\n            pathType: Prefix\n            backend:\n              service:\n                name: my-service\n                port:\n                  number: 8080`
  },
  {
    id: 'storage',
    title: 'Storage',
    description: 'Persistent volume claims, storage classes, and mount configurations.',
    labels: [ 'gp3', 'ReadWriteOnce', 'Retain' ],
    items: [
      { name: 'data-pvc', status: 'Bound', created: '2025-06-01', owner: 'data-team' },
      { name: 'logs-pvc', status: 'Bound', created: '2025-06-01', owner: 'observability' },
      { name: 'backup-pvc', status: 'Bound', created: '2025-05-20', owner: 'ops-team' },
      { name: 'tmp-pvc', status: 'Pending', created: '2025-06-05', owner: 'dev-team' },
      { name: 'cache-emptydir', status: 'Mounted', created: '2025-06-01', owner: 'dev-team' },
      { name: 'config-projected', status: 'Mounted', created: '2025-06-01', owner: 'platform-team' }
    ],
    code: `apiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: data-pvc\nspec:\n  accessModes:\n    - ReadWriteOnce\n  storageClassName: gp3-encrypted\n  resources:\n    requests:\n      storage: 50Gi\n---\nvolumeMounts:\n  - name: data\n    mountPath: /var/lib/data\n  - name: logs\n    mountPath: /var/log/app\n  - name: cache\n    mountPath: /tmp/cache\nvolumes:\n  - name: data\n    persistentVolumeClaim:\n      claimName: data-pvc\n  - name: cache\n    emptyDir:\n      sizeLimit: 500Mi`
  },
  {
    id: 'monitoring',
    title: 'Monitoring',
    description: 'Health checks, readiness probes, and metrics endpoints used for observability.',
    labels: [ 'prometheus', 'liveness', 'readiness' ],
    items: [
      { name: 'liveness-http', status: 'Passing', created: '2025-06-01', owner: 'dev-team' },
      { name: 'readiness-http', status: 'Passing', created: '2025-06-01', owner: 'dev-team' },
      { name: 'startup-tcp', status: 'Passing', created: '2025-06-01', owner: 'dev-team' },
      { name: 'metrics-endpoint', status: 'Scraping', created: '2025-06-02', owner: 'observability' },
      { name: 'alert-high-cpu', status: 'Firing', created: '2025-05-10', owner: 'sre-team' },
      { name: 'alert-error-rate', status: 'Pending', created: '2025-05-10', owner: 'sre-team' }
    ],
    code: `livenessProbe:\n  httpGet:\n    path: /healthz\n    port: 8080\n  initialDelaySeconds: 15\n  periodSeconds: 10\n  failureThreshold: 3\nreadinessProbe:\n  httpGet:\n    path: /readyz\n    port: 8080\n  initialDelaySeconds: 5\n  periodSeconds: 5\nstartupProbe:\n  tcpSocket:\n    port: 8080\n  failureThreshold: 30\n  periodSeconds: 2\n---\napiVersion: monitoring.coreos.com/v1\nkind: ServiceMonitor\nmetadata:\n  name: my-app-monitor\nspec:\n  selector:\n    matchLabels:\n      app: my-app\n  endpoints:\n    - port: metrics\n      interval: 15s\n      path: /metrics`
  }
];

const renderBodyContent = (sidebarClassName = '') => (
  <Flex direction={{ default: 'column' }} style={{ height: '100%', overflow: 'hidden' }}>
    <PageSection hasShadowBottom style={{ flexShrink: 0, zIndex: 1 }}>
      <SearchInput placeholder="Filter cards..." aria-label="Filter cards" />
    </PageSection>
    <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
      <Sidebar hasGutter className={sidebarClassName} style={{ height: '100%' }}>
        <SidebarPanel>
          <JumpLinks isVertical label="Sections">
            {sections.map((s) => (
              <JumpLinksItem key={s.id} href="#" isActive={false} onClick={(e) => e.preventDefault()}>
                {s.title}
              </JumpLinksItem>
            ))}
          </JumpLinks>
        </SidebarPanel>
        <SidebarContent>
          <Grid hasGutter>
            {sections.map((section) => (
              <Fragment key={section.id}>
                <GridItem span={12}>
                  <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapMd' }}>
                    <Content component="h3">{section.title}</Content>
                    <LabelGroup>
                      {section.labels.map((l) => (
                        <Label key={l} isCompact>{l}</Label>
                      ))}
                    </LabelGroup>
                  </Flex>
                  <Content component="p">{section.description}</Content>
                </GridItem>
                {section.items.map((item, i) => (
                  <GridItem span={4} key={`${section.id}-${i}`}>
                    <Card isFullHeight>
                      <CardHeader>
                        <CardTitle>{item.name}</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <DescriptionList isCompact isHorizontal>
                          <DescriptionListGroup>
                            <DescriptionListTerm>Status</DescriptionListTerm>
                            <DescriptionListDescription>{item.status}</DescriptionListDescription>
                          </DescriptionListGroup>
                          <DescriptionListGroup>
                            <DescriptionListTerm>Created</DescriptionListTerm>
                            <DescriptionListDescription>{item.created}</DescriptionListDescription>
                          </DescriptionListGroup>
                          <DescriptionListGroup>
                            <DescriptionListTerm>Owner</DescriptionListTerm>
                            <DescriptionListDescription>{item.owner}</DescriptionListDescription>
                          </DescriptionListGroup>
                        </DescriptionList>
                        <Content component="p">{LOREM.slice(0, 120)}</Content>
                        <CodeBlock>
                          <CodeBlockCode>{section.code}</CodeBlockCode>
                        </CodeBlock>
                      </CardBody>
                    </Card>
                  </GridItem>
                ))}
              </Fragment>
            ))}
          </Grid>
        </SidebarContent>
      </Sidebar>
    </div>
  </Flex>
);

export const TearsheetComparison: React.FunctionComponent = () => {
  const [ isTearsheetOpen, setIsTearsheetOpen ] = useState(false);
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const closeTearsheet = () => setIsTearsheetOpen(false);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Fragment>
      <style>{sidebarFixStyles}</style>
      <Flex gap={{ default: 'gapSm' }}>
        <Button variant="primary" onClick={() => setIsTearsheetOpen(true)}>
          Show Tearsheet
        </Button>
        <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
          Show Modal
        </Button>
      </Flex>

      <Tearsheet isOpen={isTearsheetOpen} onClose={closeTearsheet}>
        <TearsheetHeader title="Tearsheet — Grid layout" />
        <TearsheetBody>{renderBodyContent(SIDEBAR_FIX_CLASS)}</TearsheetBody>
        <TearsheetFooter>
          <Button variant="primary" onClick={closeTearsheet}>
            Confirm
          </Button>
          <Button variant="link" onClick={closeTearsheet}>
            Cancel
          </Button>
        </TearsheetFooter>
      </Tearsheet>

      <Modal variant={ModalVariant.large} isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader title="Modal — Grid layout" />
        <ModalBody>{renderBodyContent()}</ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={closeModal}>
            Confirm
          </Button>
          <Button variant="link" onClick={closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};
