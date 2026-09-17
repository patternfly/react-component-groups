import { FunctionComponent } from 'react';

import {
  Chart,
  ChartAxis,
  ChartBar,
  ChartDonut,
  ChartGroup,
} from '@patternfly/react-charts/victory';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalVariant,
  Title,
} from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';

import LightwellHeroImage from './assets/lightwell-hero.png';
import LightwellLogo from './assets/lightwell-logo.png';
import RedHatIBMLockup from './assets/RedHatIBMLockup.svg';
import { ProductNudgeMatchAnalysisModalProps } from './ProductNudge.types';

const useStyles = createUseStyles({
  brand: {
    '& img': {
      maxHeight: '2rem',
    },
  },
  heroArt: {
    display: 'block',
    width: '100%',
    maxHeight: '12rem',
    objectFit: 'cover',
  },
  summary: {
    display: 'flex',
    gap: 'var(--pf-t--global--spacer--lg)',
    alignItems: 'flex-start',
  },
  ecosystem: {
    display: 'flex',
    gap: 'var(--pf-t--global--spacer--lg)',
    alignItems: 'flex-start',
  },
  infoMarker: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1rem',
    height: '1rem',
    borderRadius: '50%',
    border: '1px solid currentColor',
    fontSize: '0.75rem',
    marginInlineStart: 'var(--pf-t--global--spacer--xs)',
    cursor: 'help',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--pf-t--global--spacer--md)',
    '& img': {
      maxHeight: '1.5rem',
    },
  },
  legendList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--pf-t--global--spacer--sm)',
    '& li': {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--pf-t--global--spacer--sm)',
    },
    '& span': {
      display: 'inline-block',
      width: '0.75rem',
      height: '0.75rem',
      borderRadius: '2px',
    },
  },
  learnMoreLink: {
    color: 'inherit',
  },
});

// Sample data — placeholder until real props are wired
const MATCH_DATA = {
  exact: 118,
  partial: 195,
  noMatch: 534,
};

const ECOSYSTEM_DATA = [
  { name: 'Java', exact: 70, partial: 120, noMatch: 180 },
  { name: 'Python', exact: 50, partial: 80, noMatch: 170 },
];

const CHART_COLORS = [
  'var(--pf-t--color--red--50)',
  'var(--pf-t--color--orange--50)',
  'var(--pf-t--global--background--color--primary--default)',
];

const INFO_ITEMS = [
  { label: 'Exact match', value: MATCH_DATA.exact },
  { label: 'Partial match', value: MATCH_DATA.partial },
  { label: 'No match', value: MATCH_DATA.noMatch },
];

/**
 * A match analysis modal with Victory donut and bar charts.
 * Currently uses placeholder/sample data — wire real data via props in a future iteration.
 */
export const ProductNudgeMatchAnalysisModal: FunctionComponent<ProductNudgeMatchAnalysisModalProps> = ({
  isOpen,
  onClose,
}) => {
  const classes = useStyles();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant={ModalVariant.large}
      aria-labelledby="product-nudge-match-analysis-title"
      ouiaId="ProductNudgeMatchAnalysisModal"
    >
      <ModalHeader labelId="product-nudge-match-analysis-title">
        <div className={classes.brand}>
          <img src={LightwellLogo} alt="Lightwell" />
        </div>
      </ModalHeader>
      <ModalBody>
        <img
          className={classes.heroArt}
          src={LightwellHeroImage}
          alt=""
        />
        <div>
          <Title headingLevel="h2">Match analysis</Title>
          <p>
            <strong>37%</strong> of packages match the Lightwell Network catalog.
          </p>

          <div className={classes.summary}>
            <ChartDonut
              ariaTitle="Product nudge match analysis"
              data={INFO_ITEMS.map(({ label, value }) => ({ x: label, y: value }))}
              title={`${MATCH_DATA.exact + MATCH_DATA.partial}`}
              subTitle="matches"
              colorScale={CHART_COLORS}
              constrainToVisibleArea
              height={180}
              width={220}
              padding={{ bottom: 0, left: 10, right: 10, top: 10 }}
              radius={70}
              padAngle={1}
            />
            <dl>
              {INFO_ITEMS.map(({ label, value }) => (
                <div key={label}>
                  <dt>{value}</dt>
                  <dd>
                    {label}
                    <span
                      className={classes.infoMarker}
                      aria-label={`About ${label}`}
                    >
                      ?
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <Title headingLevel="h2">By ecosystem</Title>
          <div className={classes.ecosystem}>
            <Chart
              ariaTitle="Product nudge matches by ecosystem"
              domain={{ y: [0, 200] }}
              height={220}
              width={390}
              padding={{ bottom: 45, left: 45, right: 10, top: 10 }}
            >
              <ChartAxis dependentAxis tickValues={[0, 50, 100, 150, 200]} />
              <ChartAxis />
              <ChartGroup offset={14}>
                <ChartBar
                  data={ECOSYSTEM_DATA.map(({ name, exact }) => ({ x: name, y: exact }))}
                  style={{ data: { fill: CHART_COLORS[0] } }}
                />
                <ChartBar
                  data={ECOSYSTEM_DATA.map(({ name, partial }) => ({ x: name, y: partial }))}
                  style={{ data: { fill: CHART_COLORS[1] } }}
                />
                <ChartBar
                  data={ECOSYSTEM_DATA.map(({ name, noMatch }) => ({ x: name, y: noMatch }))}
                  style={{ data: { fill: CHART_COLORS[2] } }}
                />
              </ChartGroup>
            </Chart>
            <ul aria-label="Match analysis legend" className={classes.legendList}>
              {INFO_ITEMS.map(({ label }, index) => (
                <li key={label}>
                  <span style={{ backgroundColor: CHART_COLORS[index] }} />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className={classes.actions}>
          <Button variant="primary" size="lg">
            Download report
          </Button>
          <a
            href="https://www.redhat.com/en/lightwell"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.learnMoreLink}
          >
            Learn more about Lightwell
          </a>
          <img src={RedHatIBMLockup} alt="Red Hat and IBM" />
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default ProductNudgeMatchAnalysisModal;
