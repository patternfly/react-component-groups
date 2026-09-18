import { FunctionComponent } from 'react';

import {
  AboutModal,
  ActionList,
  ActionListGroup,
  ActionListItem,
  Button,
  Content,
  Popover,
  Title,
} from '@patternfly/react-core';
import {
  Chart,
  ChartAxis,
  ChartBar,
  ChartDonut,
  ChartGroup,
  ChartTooltip,
} from '@patternfly/react-charts/victory';
import ArrowRightIcon from '@patternfly/react-icons/dist/esm/icons/arrow-right-icon.js';
import QuestionCircleIcon from '@patternfly/react-icons/dist/esm/icons/question-circle-icon.js';
import { createUseStyles } from 'react-jss';

import LightwellBgDark from './assets/lightwell-bg-dark.png';
import LightwellBgLight from './assets/lightwell-bg-light.png';
import LightwellLogo from './assets/lightwell-logo.svg';
import LightwellLogoDark from './assets/lightwell-logo-dark.svg';
import RedHatIBMLockup from './assets/RedHatIBMLockup.svg';
import RedHatIBMLockupDark from './assets/RedHatIBMLockupDark.svg';
import { ProductNudgeMatchAnalysisModalProps } from './ProductNudge.types';
import { lightwellBackgroundStyle, lightwellCtaStyle, nudgeModeStyles } from './nudgeStyles';

const useStyles = createUseStyles({
  modal: {
    // Background image: top-right, contain — matches design
    '--pf-v6-c-about-modal-box--BackgroundImage': `url(${LightwellBgLight})`,
    backgroundPosition: 'top right',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    // Background color matches Hero light mode
    ...lightwellBackgroundStyle,
    backgroundColor: 'var(--lightwell--background-color)',
    '.pf-v6-theme-dark &': {
      '--pf-v6-c-about-modal-box--BackgroundImage': `url(${LightwellBgDark})`,
      backgroundColor: 'var(--pf-t--color--black)',
      // Fix illegible chart text in dark mode
      '--pf-v6-chart-donut--label--title--Fill': 'var(--pf-t--global--text--color--regular)',
      '--pf-v6-chart-donut--label--subtitle--Fill': 'var(--pf-t--global--text--color--subtle)',
      '--pf-v6-chart-axis--tick-label--Fill': 'var(--pf-t--global--text--color--regular)',
    },
    // Brand img: prototype sizing + dark-mode source swap via CSS content replacement
    '& .pf-v6-c-about-modal-box__brand-image': {
      '--pf-v6-c-about-modal-box__brand-image--Height': 'auto',
      display: 'block',
      width: 'min(9.375rem, 42vw)',
      maxWidth: '100%',
      height: 'auto',
      objectFit: 'contain',
    },
    '.pf-v6-theme-dark & .pf-v6-c-about-modal-box__brand-image': {
      content: `url(${LightwellLogoDark})`,
    },
    // Axis lines: Victory defaults (#e0e0e0) are near-invisible on #e5e0df background
    '--pf-v6-chart-axis--axis--stroke--Color': 'var(--pf-t--global--border--color--default)',
    '--pf-v6-chart-axis--grid--stroke--Color': 'var(--pf-t--global--border--color--default)',
    '--pf-v6-chart-axis--tick--stroke--Color': 'var(--pf-t--global--border--color--default)',
    '& .pf-v6-c-about-modal-box__content': { marginBlock: 0 },
    '& .pf-v6-c-about-modal-box__header .pf-v6-c-title': {
      fontSize: 'var(--pf-t--global--font--size--lg)',
      fontWeight: 'var(--pf-t--global--font--weight--body--bold)',
    },
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--pf-t--global--spacer--md)',
  },
  donutRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--pf-t--global--spacer--lg)',
  },
  breakdownStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--pf-t--global--spacer--sm)',
  },
  breakdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--pf-t--global--spacer--xs)',
    margin: 0,
  },
  helpButton: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: 0,
    minWidth: 0,
    height: 'auto',
    color: 'var(--pf-t--global--icon--color--subtle)',
    verticalAlign: 'middle',
    '&:hover': {
      color: 'var(--pf-t--global--icon--color--regular)',
    },
  },
  ecosystemRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--pf-t--global--spacer--lg)',
  },
  legendList: {
    listStyle: 'none',
    padding: 0,
    marginBlockStart: 'var(--pf-t--global--spacer--sm)',
    marginBlockEnd: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--pf-t--global--spacer--sm)',
    '& li': {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--pf-t--global--spacer--sm)',
      whiteSpace: 'nowrap',
    },
  },
  legendDot: {
    display: 'inline-block',
    width: '0.75rem',
    height: '0.75rem',
    borderRadius: '50%',
    flexShrink: 0,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--pf-t--global--spacer--md)',
    paddingBlockStart: 'var(--pf-t--global--spacer--md)',
  },
  partnerLockup: {
    maxHeight: '1.5rem',
    width: 'auto',
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

// Lightwell's chart palette is intentionally separate from PatternFly's palette;
// custom properties allow consumers to theme it without changing the defaults.
const CHART_COLORS = [
  'var(--lightwell-chart-color-exact, #f56e6e)',
  'var(--lightwell-chart-color-partial, #f8ae54)',
  'var(--lightwell-chart-color-no-match, #f2f2f2)',
];

const LEGEND_ITEMS = [ 'Exact match', 'Partial match', 'No match' ];

export const ProductNudgeMatchAnalysisModal: FunctionComponent<ProductNudgeMatchAnalysisModalProps> = ({
  isOpen,
  onClose,
  matchData = DEFAULT_MATCH_DATA,
  ecosystemData = DEFAULT_ECOSYSTEM_DATA,
}) => {
  const classes = useStyles();
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

  return (
    <AboutModal
      isOpen={isOpen}
      onClose={onClose}
      brandImageSrc={LightwellLogo}
      brandImageAlt="Lightwell"
      aria-label="Match analysis"
      className={classes.modal}
    >
      <div className={classes.body}>
        <Title headingLevel="h3" size="lg">Match analysis</Title>
        <Content component="p">
          <strong>{matchPercentage}%</strong> of packages match the Lightwell Network catalog.
        </Content>

        <div className={classes.donutRow}>
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
            height={132}
            width={132}
            padding={{ bottom: 0, left: 0, right: 0, top: 0 }}
            radius={58}
            innerRadius={42}
            padAngle={1}
          />
          <div className={classes.breakdownStack}>
            {matchItems.map(({ label, value, helpText }) => (
              <div key={label} className={classes.breakdownItem}>
                <strong>{value}</strong>
                {label}
                <Popover
                  headerContent={label}
                  bodyContent={helpText}
                  position="top"
                >
                  <Button
                    variant="plain"
                    aria-label={`About ${label}`}
                    className={classes.helpButton}
                  >
                    <QuestionCircleIcon />
                  </Button>
                </Popover>
              </div>
            ))}
          </div>
        </div>

        <Title headingLevel="h5" size="md">By ecosystem</Title>

        <div className={classes.ecosystemRow}>
          <div style={{ width: 210, flexShrink: 0 }}>
            <Chart
              ariaTitle="By ecosystem match breakdown"
              ariaDesc="Packages by ecosystem and match type"
              domain={{ y: [ 0, Math.max(200, ...ecosystemData.flatMap(({ exact, partial, noMatch }) => [ exact, partial, noMatch ])) ] }}
              height={158}
              width={210}
              padding={{ bottom: 45, left: 56, right: 10, top: 12 }}
            >
              <ChartAxis dependentAxis tickValues={[ 50, 100, 150, 200 ]} />
              <ChartAxis />
              <ChartGroup offset={16}>
                <ChartBar
                  data={ecosystemData.map(({ name, exact }) => ({ x: name, y: exact, label: `${name} exact: ${exact}` }))}
                  labels={({ datum }) => datum.label}
                  labelComponent={<ChartTooltip />}
                  style={{ data: { fill: CHART_COLORS[0], width: 10 } }}
                />
                <ChartBar
                  data={ecosystemData.map(({ name, partial }) => ({ x: name, y: partial, label: `${name} partial: ${partial}` }))}
                  labels={({ datum }) => datum.label}
                  labelComponent={<ChartTooltip />}
                  style={{ data: { fill: CHART_COLORS[1], width: 10 } }}
                />
                <ChartBar
                  data={ecosystemData.map(({ name, noMatch }) => ({ x: name, y: noMatch, label: `${name} no match: ${noMatch}` }))}
                  labels={({ datum }) => datum.label}
                  labelComponent={<ChartTooltip />}
                  style={{ data: { fill: CHART_COLORS[2], width: 10 } }}
                />
              </ChartGroup>
            </Chart>
          </div>
          <ul aria-label="Match types" className={classes.legendList}>
            {LEGEND_ITEMS.map((label, index) => (
              <li key={label}>
                <span
                  className={classes.legendDot}
                  aria-hidden
                  style={{ backgroundColor: CHART_COLORS[index] }}
                />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className={classes.footer}>
          <ActionList>
            <ActionListGroup>
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
            </ActionListGroup>
          </ActionList>
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
        </div>
      </div>
    </AboutModal>
  );
};

export default ProductNudgeMatchAnalysisModal;
