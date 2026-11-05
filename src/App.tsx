import { useState } from 'react';

// W-Hub Components & Pages
import { WHubNavbar } from './components/WHubNavbar';
import { WHubHomePage } from './pages/WHubHomePage';
import { WHubFooter } from './components/WHubFooter';
import { WHubChatWidget } from './components/WHubChatWidget';
import { ApplicationModal } from './components/ApplicationModal';

export function App() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyRole, setApplyRole] = useState<'startup' | 'mentor' | 'student'>('startup');

  const handleOpenApply = (role: 'startup' | 'mentor' | 'student' = 'startup') => {
    setApplyRole(role);
    setIsApplyModalOpen(true);
  };

  const handleCloseApply = () => {
    setIsApplyModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfaf6] dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-orange-500 selection:text-white transition-colors duration-200">
      {/* W-Hub Global Navigation Bar */}
      <WHubNavbar onOpenApply={handleOpenApply} />

      {/* Main W-Hub Experience */}
      <main className="flex-1">
        <WHubHomePage onOpenApply={handleOpenApply} />
      </main>

      {/* W-Hub Footer */}
      <WHubFooter onOpenApply={handleOpenApply} />

      {/* Floating Interactive W-Hub AI Assistant */}
      <WHubChatWidget onOpenApply={handleOpenApply} />

      {/* Application / Incubation Modal */}
      <ApplicationModal
        isOpen={isApplyModalOpen}
        onClose={handleCloseApply}
        defaultRole={applyRole}
      />
    </div>
  );
}

export default App;
