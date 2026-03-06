import { BrowserRouter as Router } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { SmoothScrollProvider } from './providers/SmoothScrollProvider';
import { TransitionedRoutes } from './components/TransitionedRoutes';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <SmoothScrollProvider>
          <MainLayout>
            <TransitionedRoutes />
          </MainLayout>
        </SmoothScrollProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
