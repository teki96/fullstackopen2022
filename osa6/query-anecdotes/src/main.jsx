import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.jsx'

const queryClient = new QueryClient()
import { NotificationContextProvider } from './context/NotificationContext'

createRoot(document.getElementById('root')).render(
    <NotificationContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </NotificationContextProvider>
)