import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from '@/components/ErrorBoundary';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import MobileNav from '@/components/MobileNav';
import { ThemeProvider } from 'next-themes';
import Home from '@/pages/Home';
import Estimation from '@/pages/Estimation';
import MentionsLegales from '@/pages/MentionsLegales';
import Confidentialite from '@/pages/Confidentialite';

const AuthenticatedApp = () => {
  const { isLoadingPublicSettings } = useAuth();

  if (isLoadingPublicSettings) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/estimation" element={<Estimation />} />
      <Route path="/mentions-legales" element={<MentionsLegales />} />
      <Route path="/confidentialite" element={<Confidentialite />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <ScrollToTop />
            <ErrorBoundary>
              <SiteHeader />
              <div className="pb-20 md:pb-0">
                <AuthenticatedApp />
                <SiteFooter />
              </div>
              <MobileNav />
            </ErrorBoundary>
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App