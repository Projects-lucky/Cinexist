import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from '../src/components/App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from './context/AuthContext'; // Import the provider
import { WatchlistProvider } from './context/WatchlistContext';





// Create a Query Client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <BrowserRouter>
              <QueryClientProvider client={queryClient}>
                <AuthProvider> 
                <WatchlistProvider> 
                  <App/>
                </WatchlistProvider>
                </AuthProvider>
              </QueryClientProvider>
        </BrowserRouter>
  </StrictMode>,
)
