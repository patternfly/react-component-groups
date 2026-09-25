import { FunctionComponent, useEffect, useRef, useState } from 'react';

import {
  ActionList,
  ActionListGroup,
  ActionListItem,
  Button,
  Content,
  ContentVariants,
  Flex,
  FlexItem,
  getResizeObserver,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Popover,
  Stack,
  Title,
} from '@patternfly/react-core';
import {
  Chart,
  ChartAxis,
  ChartBar,
  ChartContainer,
  ChartDonut,
  ChartGroup,
  ChartTooltip,
} from '@patternfly/react-charts/victory';
import ArrowRightIcon from '@patternfly/react-icons/dist/esm/icons/arrow-right-icon.js';
import RhUiQuestionMarkCircleIcon from '@patternfly/react-icons/dist/esm/icons/rh-ui-question-mark-circle-icon.js';
import { createUseStyles } from 'react-jss';

import LightwellLogomark from './assets/lightwell-logomark-light.svg';
import LightwellLogomarkDark from './assets/lightwell-logomark-dark.svg';
import RedHatIBMLockup from './assets/RedHatIBMLockup.svg';
import RedHatIBMLockupDark from './assets/RedHatIBMLockupDark.svg';
import { ProductNudgeMatchAnalysisModalProps } from './ProductNudge.types';
import { lightwellCtaStyle, nudgeModeStyles, partnerLockupStyles } from './nudgeStyles';

const useStyles = createUseStyles({
  modal: {
    '--pf-v6-c-modal-box__header--PaddingBlockStart': 'var(--pf-t--global--spacer--xl)',
    '--pf-v6-c-modal-box__header--PaddingBlockEnd': 'var(--pf-t--global--spacer--md)',
    '--pf-v6-c-modal-box__header--PaddingInlineStart': 'var(--pf-t--global--spacer--xl)',
    '--pf-v6-c-modal-box__header--PaddingInlineEnd': 'var(--pf-t--global--spacer--xl)',
    '--pf-v6-c-modal-box__body--PaddingInlineStart': 'var(--pf-t--global--spacer--xl)',
    '--pf-v6-c-modal-box__body--PaddingInlineEnd': 'var(--pf-t--global--spacer--xl)',
    '--pf-v6-c-modal-box__footer--PaddingBlockEnd': 'var(--pf-t--global--spacer--xl)',
    '--pf-v6-c-modal-box__footer--PaddingInlineStart': 'var(--pf-t--global--spacer--xl)',
    '--pf-v6-c-modal-box__footer--PaddingInlineEnd': 'var(--pf-t--global--spacer--xl)',
    '--pf-v6-c-content--small--MarginBlockEnd': 0,
    '.pf-v6-theme-dark &': {
      // Keep chart labels legible against PatternFly's dark modal background.
      '--pf-v6-chart-donut--label--title--Fill': 'var(--pf-t--global--text--color--regular)',
      '--pf-v6-chart-donut--label--subtitle--Fill': 'var(--pf-t--global--text--color--subtle)',
      '--pf-v6-chart-axis--tick-label--Fill': 'var(--pf-t--global--text--color--regular)',
    },
  },
  partnerLockup: partnerLockupStyles,
  centeredActionListGroup: {
    alignItems: 'center',
  },
  ecosystemChartViewport: {
    width: '100%',
    minWidth: 0,
    height: '158px',
  },
  modalTitleIcon: {
    width: '1.5rem',
    height: '1.5rem',
  },
  ...nudgeModeStyles,
});

const DEFAULT_MATCH_DATA = {
  exact: 118,
  partial: 195,
  noMatch: 534,
};

const DEFAULT_ECOSYSTEM_DATA = [
  { name: 'Java', exact: 70, partial: 120, noMatch: 180 },
  { name: 'Python', exact: 50, partial: 80, noMatch: 170 },
];

const DEFAULT_ECOSYSTEM_CHART_WIDTH = 600;
const ECOSYSTEM_CHART_HEIGHT = 158;

// Lightwell's chart palette is intentionally separate from PatternFly's palette;
// custom properties allow consumers to theme it without changing the defaults.
const CHART_COLORS = [
  'var(--lightwell-chart-color-exact, #f56e6e)',
  'var(--lightwell-chart-color-partial, #f8ae54)',
  'var(--lightwell-chart-color-no-match, #f2f2f2)',
];

const LightwellTitleIcon: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={`${classes.modalTitleIcon}`}>
      <img src={LightwellLogomark} alt="" className={classes.lightModeOnly} />
      <img src={LightwellLogomarkDark} alt="" className={classes.darkModeOnly} />
    </div>
  );
};

export const ProductNudgeMatchAnalysisModal: FunctionComponent<ProductNudgeMatchAnalysisModalProps> = ({
  isOpen,
  onClose,
  matchData = DEFAULT_MATCH_DATA,
  ecosystemData = DEFAULT_ECOSYSTEM_DATA,
}) => {
  const classes = useStyles();
  const ecosystemChartViewportRef = useRef<HTMLDivElement>(null);
  const [ ecosystemChartWidth, setEcosystemChartWidth ] = useState(DEFAULT_ECOSYSTEM_CHART_WIDTH);
  const totalPackages = matchData.exact + matchData.partial + matchData.noMatch;
  const totalMatches = matchData.exact + matchData.partial;
  const matchPercentage = totalPackages ? Math.round((totalMatches / totalPackages) * 100) : 0;
  const matchItems = [
    {
      label: 'exact matches',
      value: matchData.exact,
      helpText: 'Packages with a direct version-matched equivalent in the Lightwell catalog.',
    },
    {
      label: 'partial matches',
      value: matchData.partial,
      helpText: 'Packages with a near-match or alternative available in the Lightwell catalog.',
    },
    {
      label: 'no match',
      value: matchData.noMatch,
      helpText: 'Packages with no equivalent found in the Lightwell catalog.',
    },
  ];

  useEffect(() => {
    const chartViewport = ecosystemChartViewportRef.current;
    if (!chartViewport) {
      return;
    }

    const updateChartWidth = () => {
      const width = chartViewport.clientWidth;
      if (width > 0) {
        setEcosystemChartWidth(width);
      }
    };

    const unobserve = getResizeObserver(chartViewport, updateChartWidth);
    updateChartWidth();

    return unobserve;
  }, [ ]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="large"
      aria-labelledby="product-nudge-match-analysis-title"
      className={classes.modal}
    >
      <ModalHeader 
        labelId="product-nudge-match-analysis-title"
        title="Lightwell Lens"
        titleIconVariant={LightwellTitleIcon}
        description="Lightwell is a joint effort between Red Hat and IBM that helps you secure open source dependencies at scale. When a vulnerability would otherwise require a disruptive third-party upgrade, Lightwell Network can provide a validated, backported security fix for the version you already run—so you can remediate without breaking production."
      />

      <ModalBody tabIndex={0}>
        <Flex direction={{ default: 'column', md: 'row' }} gap={{ default: 'gap2xl' }}>
          <FlexItem flex={{ default: 'flex_1' }}>
            <Stack hasGutter>
              <div className="">
                <Stack hasGutter>
                  <Title headingLevel="h2" size="md">Match analysis</Title>
                  <Content component="p">
                    <strong>{matchPercentage}%</strong> of packages match the Lightwell Network catalog.
                  </Content>

                  <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapLg' }}>
                    <FlexItem flex={{ default: 'flexNone' }}>
                      <ChartDonut
                        ariaTitle="Package match breakdown"
                        ariaDesc={`${matchData.exact} exact, ${matchData.partial} partial, and ${matchData.noMatch} no match packages`}
                        data={matchItems.map(({ label, value }) => ({ x: label, y: value }))}
                        labels={({ datum }) => `${datum.x}: ${datum.y}`}
                        labelComponent={<ChartTooltip />}
                        title={`${totalMatches}`}
                        subTitle="matches"
                        colorScale={CHART_COLORS}
                        constrainToVisibleArea
                        height={160}
                        width={160}
                        padding={{ bottom: 0, left: 0, right: 0, top: 0 }}
                        radius={70}
                        innerRadius={52}
                        padAngle={1}
                      />
                    </FlexItem>
                    <FlexItem>
                      <Stack>
                        {matchItems.map(({ label, value, helpText }) => (
                          <Flex key={label} alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapXs' }}>
                            <strong>{value}</strong>
                            <Popover
                              headerContent={label}
                              bodyContent={helpText}
                              position="top"
                            >
                              <Button
                                variant="plain"
                                aria-label={`About ${label}`}
                                icon={<RhUiQuestionMarkCircleIcon />}
                                iconPosition="end"
                              >
                                {label}
                              </Button>
                            </Popover>
                          </Flex>
                        ))}
                      </Stack>
                    </FlexItem>
                  </Flex>
                </Stack>
              </div>
            </Stack>
          </FlexItem>

          <FlexItem flex={{ default: 'flex_1' }}>
            <Stack hasGutter>
              <div className="">
                <Stack hasGutter>
                  <Title headingLevel="h2" size="md">By ecosystem</Title>
                  <Content component="p">See how packages map to supported ecosystems.</Content>

                  <div
                    role="region"
                    aria-label="By ecosystem chart"
                    tabIndex={0}
                    className={classes.ecosystemChartViewport}
                    ref={ecosystemChartViewportRef}
                  >
                    <Chart
                      ariaTitle="By ecosystem match breakdown"
                      ariaDesc="Packages by ecosystem and match type"
                      colorScale={CHART_COLORS}
                      domain={{ y: [ 0, Math.max(200, ...ecosystemData.flatMap(({ exact, partial, noMatch }) => [ exact, partial, noMatch ])) ] }}
                      height={ECOSYSTEM_CHART_HEIGHT}
                      legendData={[ { name: 'Exact match' }, { name: 'Partial match' }, { name: 'No match' } ]}
                      legendOrientation="vertical"
                      legendPosition="right"
                      padding={{ bottom: 45, left: 58, right: 150, top: 12 }}
                      width={DEFAULT_ECOSYSTEM_DATA.length * 75 + 250}
                      containerComponent={<ChartContainer style={{ height: '100%', width: '100%' }} />}
                    >
                      <ChartAxis dependentAxis showGrid tickValues={[ 50, 100, 150, 200 ]} />
                      <ChartAxis tickValues={ecosystemData.map(({ name }) => name)} />
                      <ChartGroup offset={24}>
                        <ChartBar
                          data={ecosystemData.map(({ name, exact }) => ({ x: name, y: exact, label: `Exact match: ${exact}` }))}
                          labels={({ datum }) => datum.label}
                          labelComponent={<ChartTooltip />}
                        />
                        <ChartBar
                          data={ecosystemData.map(({ name, partial }) => ({ x: name, y: partial, label: `Partial match: ${partial}` }))}
                          labels={({ datum }) => datum.label}
                          labelComponent={<ChartTooltip />}
                        />
                        <ChartBar
                          data={ecosystemData.map(({ name, noMatch }) => ({ x: name, y: noMatch, label: `No match: ${noMatch}` }))}
                          labels={({ datum }) => datum.label}
                          labelComponent={<ChartTooltip />}
                        />
                      </ChartGroup>
                    </Chart>
                  </div>
                </Stack>
              </div>
            </Stack>
          </FlexItem>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Stack hasGutter style={{ minWidth: 0, width: '100%' }}>
          <Content component={ContentVariants.small}>
            Download a full, shareable report with detailed match results and remediation guidance.
          </Content>
          <ActionList>
            <ActionListGroup className={classes.centeredActionListGroup}>
              <ActionListItem>
                <Button
                  variant="primary"
                  size="lg"
                  style={lightwellCtaStyle}
                >
                  Download report
                </Button>
              </ActionListItem>
              <ActionListItem>
                <Button
                  variant="link"
                  size="lg"
                  component="a"
                  href="https://www.redhat.com/en/lightwell"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more about Lightwell <ArrowRightIcon aria-hidden />
                </Button>
              </ActionListItem>
              <ActionListItem>
                <img
                  src={RedHatIBMLockup}
                  alt="Red Hat and IBM"
                  className={`${classes.partnerLockup} ${classes.lightModeOnly}`}
                />
                <img
                  src={RedHatIBMLockupDark}
                  alt="Red Hat and IBM"
                  className={`${classes.partnerLockup} ${classes.darkModeOnly}`}
                />
              </ActionListItem>
            </ActionListGroup>
          </ActionList>
        </Stack>
      </ModalFooter>
    </Modal>
  );
};

export default ProductNudgeMatchAnalysisModal;
