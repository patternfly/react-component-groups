import Severity, { SeverityType } from '../../packages/module/dist/dynamic/Severity';

const severities = [
  { type: SeverityType.critical, label: 'Critical severity', ouiaId: 'Severity-critical' },
  { type: SeverityType.important, label: 'Important severity', ouiaId: 'Severity-important' },
  { type: SeverityType.moderate, label: 'Moderate severity', ouiaId: 'Severity-moderate' },
  { type: SeverityType.minor, label: 'Minor severity', ouiaId: 'Severity-minor' },
  { type: SeverityType.none, label: 'No severity', ouiaId: 'Severity-none' },
  { type: SeverityType.undefined, label: 'Undefined severity', ouiaId: 'Severity-undefined' }
];

describe('Severity', () => {
  severities.map(({ type, label, ouiaId }) => {
    it(`renders Severity with ${type} severity`, () => {
      cy.mount(<Severity severity={type} label={label} ouiaId={ouiaId} />);
      cy.get(`[data-ouia-component-id="${ouiaId}"]`).should('exist');
      cy.get(`[data-ouia-component-id="${ouiaId}"]`).should('have.attr', 'title', label);
      cy.get('span').contains(label);
    });
  });

  it('hides label when labelHidden is true', () => {
    cy.mount(<Severity severity={SeverityType.important} label="Important severity" labelHidden />);
    cy.contains('Important severity').should('not.exist');
  });
});
