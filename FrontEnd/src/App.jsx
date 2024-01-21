import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '../src/Routes/AppRoutes';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <Router>
      <div>
        <main>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </main>
      </div>
    </Router>
  );
}

export default App;
