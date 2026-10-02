import type { FunctionComponent } from 'react';
import { useEffect, useRef, useState } from 'react';

import {
  Button,
  Content,
  Flex,
  FlexItem,
  getResizeObserver,
  Modal,
  ModalBody,
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
import {
  ProductNudgeAction,
  ProductNudgeBrand,
  ProductNudgeCtaColorScheme,
  ProductNudgeEcosystemData,
  ProductNudgeImage,
  ProductNudgeMatchData,
} from './ProductNudge.types';
import { lightwellCtaStyle, nudgeModeStyles } from './nudgeStyles';
import { lightwellBrandAssets } from './productNudgeDefaults';
import { ProductNudgeModalFooter } from './ProductNudgeModalFooter';

export interface ProductNudgeDataModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Summary counts for the built-in match charts; omitted when using custom analysis content. */
  matchData?: ProductNudgeMatchData;
  /** Per-ecosystem counts for the built-in charts; omitted when using custom analysis content. */
  ecosystemData?: ProductNudgeEcosystemData[];
  /** Applies a named brand preset; all copy remains caller-supplied. */
  brand?: ProductNudgeBrand;
  /** Modal title. */
  titleText: React.ReactNode;
  /** Optional icon displayed beside the modal title. */
  titleIcon?: React.ReactNode;
  /** Optional description displayed below the modal title. */
  descriptionText?: React.ReactNode;
  /** Replaces the default chart analysis region with caller-provided content. */
  analysisContent?: React.ReactNode;
  /** Optional text displayed in the modal footer. */
  footerText?: React.ReactNode;
  /** Optional primary action displayed in the modal footer. */
  primaryAction?: ProductNudgeAction;
  /** Optional secondary action displayed in the modal footer. */
  secondaryAction?: ProductNudgeAction;
  /** Footer partner logo override. */
  partnerLogo?: ProductNudgeImage;
  /** Dark-mode footer partner logo override. */
  partnerLogoDark?: ProductNudgeImage;
  /** Override the primary CTA visual scheme. */
  ctaColorScheme?: ProductNudgeCtaColorScheme;
  /** Optional palette for the built-in charts. */
  chartColors?: string[];
  /** Prefix for generated modal and accessibility IDs. */
  id?: string;
}

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
  },
  ecosystemChartViewport: {
    width: '100%',
    minWidth: 0,
    height: '158px',
    overflowX: 'auto',
  },
  modalTitleIcon: {
    width: '1.5rem',
    height: '1.5rem',
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  ...nudgeModeStyles,
});

const DEFAULT_ECOSYSTEM_CHART_WIDTH = 600;
const ECOSYSTEM_CHART_HEIGHT = 158;

// Lightwell's chart palette is intentionally separate from PatternFly's palette;
// custom properties allow consumers to theme it without changing the defaults.
const LIGHTWELL_CHART_COLORS = [
  'var(--lightwell-chart-color-exact, #f56e6e)',
  'var(--lightwell-chart-color-partial, #f8ae54)',
  'var(--lightwell-chart-color-no-match, var(--pf-t--chart--global--fill--color--200, #e0e0e0))',
];

const ECOSYSTEM_LEGEND_LABELS = [ 'Exact match', 'Partial match', 'No match' ];

const describeEcosystemData = (data: ProductNudgeEcosystemData[]) => data.map(({ name, exact, partial, noMatch }) => {
  const ecosystemName = typeof name === 'string' || typeof name === 'number' ? String(name) : 'Ecosystem';
  return `${ecosystemName}: ${exact} exact matches, ${partial} partial matches, ${noMatch} with no match`;
}).join('. ');

const LightwellTitleIcon: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={`${classes.modalTitleIcon}`}>
      <img src={LightwellLogomark} alt="" className={classes.lightModeOnly} />
      <img src={LightwellLogomarkDark} alt="" className={classes.darkModeOnly} />
    </div>
  );
};

let analysisModalInstance = 0;

const renderFooterAction = (
  action: ProductNudgeAction | undefined,
  variant: 'primary' | 'link',
  style?: React.CSSProperties,
) => {
  if (!action) {
    return null;
  }

  return action.href ? (
    <Button
      component="a"
      href={action.href}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      size="lg"
      style={style}
    >
      {action.label}
      {variant === 'link' && <ArrowRightIcon aria-hidden />}
    </Button>
  ) : (
    <Button variant={variant} size="lg" onClick={action.onClick} style={style} isDisabled={!action.onClick}>
      {action.label}
    </Button>
  );
};

export const ProductNudgeDataModal: FunctionComponent<ProductNudgeDataModalProps> = ({
  isOpen,
  onClose,
  matchData,
  ecosystemData,
  brand,
  titleText,
  titleIcon,
  descriptionText,
  analysisContent,
  footerText,
  primaryAction,
  secondaryAction,
  partnerLogo,
  partnerLogoDark,
  ctaColorScheme,
  chartColors: providedChartColors,
  id,
}: ProductNudgeDataModalProps) => {
  const classes = useStyles();
  const ecosystemChartViewportRef = useRef<HTMLDivElement>(null);
  const [ ecosystemChartWidth, setEcosystemChartWidth ] = useState(DEFAULT_ECOSYSTEM_CHART_WIDTH);
  const idRef = useRef<string | undefined>(undefined);
  if (!idRef.current) {
    idRef.current = id ?? `product-nudge-analysis-${++analysisModalInstance}`;
  }
  const idPrefix = id ?? idRef.current;
  const resolvedTitleIcon = titleIcon ?? (brand === 'lightwell' ? <LightwellTitleIcon /> : undefined);
  const resolvedLogo = partnerLogo ?? (brand === 'lightwell' ? lightwellBrandAssets.partnerLogo : undefined);
  const resolvedLogoDark = partnerLogoDark ?? (brand === 'lightwell' && !partnerLogo ? lightwellBrandAssets.partnerLogoDark : undefined);
  const ctaStyle = (ctaColorScheme ?? (brand === 'lightwell' ? 'lightwell' : 'default')) === 'lightwell'
    ? lightwellCtaStyle
    : undefined;
  const chartColors = providedChartColors ?? (brand === 'lightwell' ? LIGHTWELL_CHART_COLORS : undefined);
  const legendData = ECOSYSTEM_LEGEND_LABELS.map((name, index) => ({
    name,
    ...(chartColors?.length && {
      symbol: { fill: chartColors[index % chartColors.length] },
    }),
  }));
  const titleIconVariant = resolvedTitleIcon ? () => <>{resolvedTitleIcon}</> : undefined;
  const chartMatchData = matchData ?? { exact: 0, partial: 0, noMatch: 0 };
  const chartEcosystemData = ecosystemData ?? [];
  const totalPackages = chartMatchData.exact + chartMatchData.partial + chartMatchData.noMatch;
  const totalMatches = chartMatchData.exact + chartMatchData.partial;
  const matchPercentage = totalPackages ? Math.round((totalMatches / totalPackages) * 100) : 0;
  const matchItems = [
    {
      label: 'exact matches',
      value: chartMatchData.exact,
      helpText: 'Packages with a direct version-matched equivalent in the catalog.',
    },
    {
      label: 'partial matches',
      value: chartMatchData.partial,
      helpText: 'Packages with a near-match or alternative available in the catalog.',
    },
    {
      label: 'no match',
      value: chartMatchData.noMatch,
      helpText: 'Packages with no equivalent found in the catalog.',
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
      aria-labelledby={`${idPrefix}-title`}
      aria-describedby={descriptionText ? `${idPrefix}-description` : undefined}
      className={classes.modal}
    >
      <ModalHeader
        labelId={`${idPrefix}-title`}
        descriptorId={descriptionText ? `${idPrefix}-description` : undefined}
        title={titleText}
        titleIconVariant={titleIconVariant}
        description={descriptionText}
      />

      <ModalBody aria-label="Analysis details" role="region" tabIndex={0}>
        {analysisContent ?? (matchData && ecosystemData && (
          <Flex direction={{ default: 'column', md: 'row' }} gap={{ default: 'gap2xl' }}>
            <FlexItem flex={{ default: 'flex_1' }}>
              <Stack hasGutter>
                <div className="">
                  <Stack hasGutter>
                    <Title headingLevel="h2" size="md">Match analysis</Title>
                    <Content component="p">
                      <strong>{matchPercentage}%</strong> of packages match the catalog.
                    </Content>

                    <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapLg' }}>
                      <FlexItem flex={{ default: 'flexNone' }}>
                        <ChartDonut
                          ariaTitle="Package match breakdown"
                          ariaDesc={`${chartMatchData.exact} exact, ${chartMatchData.partial} partial, and ${chartMatchData.noMatch} no match packages`}
                          data={matchItems.map(({ label, value }) => ({ x: label, y: value }))}
                          labels={({ datum }) => `${datum.x}: ${datum.y}`}
                          labelComponent={<ChartTooltip constrainToVisibleArea />}
                          title={`${totalMatches}`}
                          subTitle="matches"
                          colorScale={chartColors}
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
                        ariaDesc={describeEcosystemData(chartEcosystemData) || 'Packages by ecosystem and match type'}
                        domain={{ y: [ 0, Math.max(200, ...chartEcosystemData.flatMap(({ exact, partial, noMatch }) => [ exact, partial, noMatch ])) ] }}
                        height={ECOSYSTEM_CHART_HEIGHT}
                        legendData={legendData}
                        legendOrientation="vertical"
                        legendPosition="right"
                        padding={{ bottom: 45, left: 58, right: 150, top: 12 }}
                        width={Math.max(chartEcosystemData.length * 75 + 250, ecosystemChartWidth)}
                        containerComponent={<ChartContainer style={{ height: '100%', width: '100%' }} />}
                      >
                        <ChartAxis dependentAxis showGrid tickValues={[ 50, 100, 150, 200 ]} />
                        <ChartAxis tickValues={chartEcosystemData.map(({ name }) => name)} />
                        <ChartGroup offset={24} colorScale={chartColors}>
                          <ChartBar
                            data={chartEcosystemData.map(({ name, exact }) => ({ x: name, y: exact, label: `Exact match: ${exact}` }))}
                            labels={({ datum }) => datum.label}
                            labelComponent={<ChartTooltip constrainToVisibleArea />}
                          />
                          <ChartBar
                            data={chartEcosystemData.map(({ name, partial }) => ({ x: name, y: partial, label: `Partial match: ${partial}` }))}
                            labels={({ datum }) => datum.label}
                            labelComponent={<ChartTooltip constrainToVisibleArea />}
                          />
                          <ChartBar
                            data={chartEcosystemData.map(({ name, noMatch }) => ({ x: name, y: noMatch, label: `No match: ${noMatch}` }))}
                            labels={({ datum }) => datum.label}
                            labelComponent={<ChartTooltip constrainToVisibleArea />}
                          />
                        </ChartGroup>
                      </Chart>
                    </div>
                  </Stack>
                </div>
              </Stack>
            </FlexItem>
          </Flex>
        ))}
      </ModalBody>
      <ProductNudgeModalFooter
        footerText={footerText}
        partnerLogo={resolvedLogo}
        partnerLogoDark={resolvedLogoDark}
        actions={(
          <>
            {primaryAction && <FlexItem>{renderFooterAction(primaryAction, 'primary', ctaStyle)}</FlexItem>}
            {secondaryAction && <FlexItem>{renderFooterAction(secondaryAction, 'link')}</FlexItem>}
          </>
        )}
      />
    </Modal>
  );
};

export default ProductNudgeDataModal;
