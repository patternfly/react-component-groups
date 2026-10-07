import { createElement } from 'react';
import { ProductNudgeDataModal } from '../../packages/module/dist/dynamic/ProductNudge';

const props = {
  isOpen: true,
  onClose: () => undefined,
  brand: 'lightwell' as const,
  titleText: 'Lightwell Lens',
  matchData: { exact: 118, partial: 195, noMatch: 534 },
  ecosystemData: [
    { name: 'Java', exact: 200, partial: 120, noMatch: 180 },
    { name: 'Python', exact: 50, partial: 80, noMatch: 170 },
  ],
};

const expectTextInsideChart = (tooltipText: string) => {
  cy.contains('text', tooltipText).should('exist').then(($text) => {
    const textBounds = $text[0].getBoundingClientRect();
    const svgBounds = $text[0].ownerSVGElement?.getBoundingClientRect();

    if (!svgBounds) {
      throw new Error('Expected the tooltip label to belong to an SVG chart');
    }

    expect(textBounds.left).to.be.at.least(svgBounds.left - 1);
    expect(textBounds.right).to.be.at.most(svgBounds.right + 1);
    expect(textBounds.top).to.be.at.least(svgBounds.top - 1);
    expect(textBounds.bottom).to.be.at.most(svgBounds.bottom + 1);
  });
};

describe('ProductNudgeDataModal chart theming and tooltips', () => {
  afterEach(() => {
    cy.get('html').invoke('removeClass', 'pf-v6-theme-dark');
  });

  it('resolves chart fills and legend text through PatternFly light/dark tokens', () => {
    cy.mount(createElement(ProductNudgeDataModal, props));

    const noMatchFill = 'svg path[style*="lightwell-chart-color-no-match"]';
    const legendLabel = '[aria-label="By ecosystem chart"] svg text tspan';
    const donutTitle = 'svg text tspan';
    let lightDonutTitleFill: string;

    cy.get(noMatchFill).first().should('have.css', 'fill', 'rgb(224, 224, 224)');
    cy.get(legendLabel).filter((_index, element) => element.textContent === 'Exact match')
      .should('have.css', 'fill', 'rgb(31, 31, 31)');
    cy.get(donutTitle).filter((_index, element) => element.textContent === '313').then(($title) => {
      lightDonutTitleFill = getComputedStyle($title[0]).fill;
    });

    cy.get('html').invoke('addClass', 'pf-v6-theme-dark');

    cy.get(noMatchFill).first().should('have.css', 'fill', 'rgb(112, 112, 112)');
    cy.get(legendLabel).filter((_index, element) => element.textContent === 'Exact match')
      .should('have.css', 'fill', 'rgb(255, 255, 255)');
    cy.get(donutTitle).filter((_index, element) => element.textContent === '313').should(($title) => {
      expect(getComputedStyle($title[0]).fill).not.to.equal(lightDonutTitleFill);
    });
  });

  it('keeps donut and tall-bar tooltips inside their chart viewports', () => {
    cy.mount(createElement(ProductNudgeDataModal, props));

    cy.get('svg path[style*="lightwell-chart-color-partial"]')
      .first()
      .trigger('mouseover');
    expectTextInsideChart('partial matches: 195');

    cy.get('[aria-label="By ecosystem chart"] svg path[style*="lightwell-chart-color-exact"][index="0"]')
      .trigger('mouseover');
    expectTextInsideChart('Exact match: 200');
  });
});
