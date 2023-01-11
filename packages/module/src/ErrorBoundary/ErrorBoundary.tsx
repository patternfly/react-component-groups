import * as React from 'react';
import PageHeader, { PageHeaderTitle } from '../PageHeader';
import ErrorState from '../ErrorState';
import { ExpandableSection } from '@patternfly/react-core';
import ErrorStack from './ErrorStack';
import Section from '../Section';

interface ErrorPageProps {
  /** The title to display on the error page */
  headerTitle: string;
  /** Indicates if this is a silent error */
  silent?: boolean;
  /** Title given to the error */
  errorTitle?: string;
  /** A description of the error */
  errorDescription?: string;
}

interface ErrorPageState {
  /** Indicates if there is currently an error */
  hasError: boolean;
  /** Error */
  error?: Error;
  /** Used for browser session history */
  historyState: History['state'];
}

// As of time of writing, React only supports error boundaries in class components
class ErrorBoundaryPage extends React.Component<ErrorPageProps, ErrorPageState> {
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

  render() {
    if (this.state.historyState !== history.state) {
      this.setState({
        hasError: false,
        historyState: history.state,
      });
    }

    if (this.state.hasError) {
      if (this.props.silent) {
        return null;
      }
      return (
        <div>
          <PageHeader>
            <PageHeaderTitle title={this.props.headerTitle} />
          </PageHeader>
          <Section>
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
            />
          </Section>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryPage;
