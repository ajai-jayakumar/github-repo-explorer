import { BrowserRouter, Route, Routes } from 'react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Home from './pages/Home';
import { ReactQueryProvider } from './providers/ReactQueryProvider';

export default function App() {
  return (
    <ReactQueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryProvider>
  );
}
