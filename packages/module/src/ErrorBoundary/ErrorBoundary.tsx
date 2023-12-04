import * as React from 'react';
import { ExpandableSection, Title } from '@patternfly/react-core';
import ErrorState from '../ErrorState';
import ErrorStack from '../ErrorStack';

export interface ErrorPageProps {
  /** The title text to display on the error page */
  headerTitle: string;
  /** Indicates if the error is silent */
  silent?: boolean;
  /** The title text to display with the error */
  errorTitle?: string;
  /** The description text to display with the error */
  errorDescription?: React.ReactNode;
  /** The text for the toggle link that users can select to view error details */
  errorToggleText?: string;
  /** The default description text to display with the error if no errorDescription is provided */
  defaultErrorDescription?: React.ReactNode;
  /** The component that the error boundary component is wrapped around, which should be returned if there is no error  */
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
class ErrorBoundary extends React.Component<ErrorPageProps, ErrorPageState> {
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
                  <ExpandableSection toggleText={this.props.errorToggleText ? this.props.errorToggleText : "Show details"}>
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