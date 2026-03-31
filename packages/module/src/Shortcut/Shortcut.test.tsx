import { render, screen } from '@testing-library/react';
import Shortcut from './Shortcut';

describe('Shortcut component', () => {
  it('should render correctly', () => {
    expect(render(<Shortcut description='Shortcut description' keys={[ 'cmd', 'shift' ]} click/>)).toMatchSnapshot();
  });

  it('should render custom i18n labels for mouse actions', () => {
    render(
      <Shortcut
        keys={[]}
        hover hoverLabel="Survoler"
        click clickLabel="Cliquer"
        rightClick rightClickLabel="Clic droit"
        drag dragLabel="Glisser"
        dragAndDrop dragAndDropLabel="Glisser + Déposer"
      />
    );

    expect(screen.getByText('Survoler')).toBeInTheDocument();
    expect(screen.getByText('Cliquer')).toBeInTheDocument();
    expect(screen.getByText('Clic droit')).toBeInTheDocument();
    expect(screen.getByText('Glisser')).toBeInTheDocument();
    expect(screen.getByText('Glisser + Déposer')).toBeInTheDocument();
  });
});
