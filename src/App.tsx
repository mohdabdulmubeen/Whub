import React, { useState } from 'react';
import { CelpinNavbar } from './components/CelpinNavbar';
import { CelpinFooter } from './components/CelpinFooter';
import { NotificationDrawer } from './components/NotificationDrawer';
import { NotificationToast } from './components/NotificationToast';
import { ListYourSpaceModal } from './components/ListYourSpaceModal';
import { NotificationProvider } from './context/NotificationContext';
import { HomePage } from './pages/HomePage';
import { BookingPage } from './pages/BookingPage';
import { ProposalPage } from './pages/ProposalPage';
import { RegisterPage } from './pages/RegisterPage';
import { AdminPage } from './pages/AdminPage';
import { CareersPage } from './pages/CareersPage';
import { AboutPage } from './pages/AboutPage';
import { CelpinChatWidget } from './components/CelpinChatWidget';

export function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [params, setParams] = useState<any>({});
  const [isListSpaceOpen, setIsListSpaceOpen] = useState<boolean>(false);

  const handleNavigate = (page: string, newParams?: any) => {
    setCurrentPage(page);
    if (newParams) {
      setParams(newParams);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NotificationProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-amber-600 selection:text-white">
        {/* Celpin Official Navbar */}
        <CelpinNavbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenListSpace={() => setIsListSpaceOpen(true)}
        />

        {/* Notifications Slide-over Drawer & Real-Time Toast */}
        <NotificationDrawer onNavigate={handleNavigate} />
        <NotificationToast onNavigate={handleNavigate} />

        {/* List Your Space / Become a myHQ Partner Modal */}
        <ListYourSpaceModal
          isOpen={isListSpaceOpen}
          onClose={() => setIsListSpaceOpen(false)}
        />

        {/* Main Pages */}
        <main className="flex-1 pt-18 sm:pt-20">
          {currentPage === 'home' && (
            <HomePage
              onNavigate={handleNavigate}
              onOpenListSpace={() => setIsListSpaceOpen(true)}
            />
          )}
          {currentPage === 'booking' && (
            <BookingPage
              onNavigate={handleNavigate}
              initialSeatId={params.selectedSeatId}
              initialZone={params.selectedZone}
              preselectedCart={params.preselectedCart}
              initialLocation={params.initialLocation || params.location}
              initialCustomerName={params.customerName}
              initialCustomerEmail={params.customerEmail}
            />
          )}
          {currentPage === 'proposal' && <ProposalPage />}
          {currentPage === 'register' && (
            <RegisterPage
              onNavigate={handleNavigate}
              redirectTo={params.redirectTo || 'booking'}
              initialParams={params}
            />
          )}
          {currentPage === 'about' && (
            <AboutPage
              onNavigate={handleNavigate}
              onOpenListSpace={() => setIsListSpaceOpen(true)}
            />
          )}
          {currentPage === 'careers' && <CareersPage onNavigate={handleNavigate} />}
          {currentPage === 'admin' && <AdminPage onNavigate={handleNavigate} />}
        </main>

        {/* Celpin Official Footer */}
        <CelpinFooter onNavigate={handleNavigate} />

        {/* Celpin AI Concierge Floating Chat Assistant */}
        <CelpinChatWidget />
      </div>
    </NotificationProvider>
  );
}

export default App;
