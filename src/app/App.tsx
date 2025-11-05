import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import { ThemeProvider } from '@/providers/themes'
import { LanguageProvider } from '@/providers/languages'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
