import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './pages/routes/Routes';

function App() {
  return (
    <div className="max-w-7xl mx-auto">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
