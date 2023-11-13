import * as React from 'react';
import { ExpandableSection, Title } from '@patternfly/react-core';
import ErrorState from '../ErrorState';
import ErrorStack from '../ErrorStack';

export interface ErrorPageProps {
  /** Title to display on the error page */
  headerTitle: string;
  /** Indicates if this is a silent error */
  silent?: boolean;
  /** Title given to the error */
  errorTitle?: string;
  /** A description of the error */
  errorDescription?: React.ReactNode;
  /** A default description of the error used if no errorDescription is provided. */
  defaultErrorDescription?: React.ReactNode;
  /** Children components */
  children?: React.ReactNode;
}

export interface ErrorPageState {
  /** Indicates if there is currently an error */
  hasError: boolean;
  /** Error */
  error?: Error;
  /** Used for browser session history */
  historyState: History['state'];
}

// As of time of writing, React only supports error boundaries in class components
class ErrorBoundary extends React.Component<React.PropsWithChildren<ErrorPageProps>, ErrorPageState> {
  constructor(props: Readonly<ErrorPageProps>) {
    super(props);
    this.state = {
      hasError: false,
      historyState: history.state,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorPageState {
    return { hasError: true, error, historyState: history.state };
  }

  updateState = () => {
    if (this.state.historyState !== history.state) {
      this.setState({
        hasError: false,
        historyState: history.state,
      });
    }
  };

  componentDidUpdate(): void {
    this.updateState();
  }

  componentDidMount(): void {
    this.updateState();
  }

  render() {
    if (this.state.hasError) {
      if (this.props.silent) {
        return null;
      }
      return (
        <React.Fragment>
          <Title headingLevel="h1" size="2xl">{this.props.headerTitle}</Title>
          <ErrorState
            errorTitle={this.props.errorTitle}
            errorDescription={
              <>
                <span>{this.props.errorDescription}</span>
                {this.state.error && ( 
                  <ExpandableSection toggleText="Show details">
                    <ErrorStack error={this.state.error} />
                  </ExpandableSection>
                )}
              </>
            }
            defaultErrorDescription={this.props.defaultErrorDescription}
          />
        </React.Fragment>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;