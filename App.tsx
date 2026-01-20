
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Schedule from './components/Schedule';
import Grades from './components/Grades';
import ImportData from './components/ImportData';
import ChatBot from './components/ChatBot';
import { Menu, Ship, Smartphone, X } from 'lucide-react';
import { AppState, StudentInfo, ScheduleItem, GradeItem } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [state, setState] = useState<AppState>({
    student: null,
    schedule: [],
    grades: [],
    isProcessing: false
  });

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!window.matchMedia('(display-mode: standalone)').matches) {
        setShowInstallBanner(true);
      }
    });

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    if (isIOS && !window.matchMedia('(display-mode: standalone)').matches) {
      const timer = setTimeout(() => setShowInstallBanner(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowInstallBanner(false);
      }
    } else {
      alert("Để cài đặt App:\n- Android: Nhấn dấu 3 chấm -> 'Cài đặt ứng dụng'.\n- iPhone: Nhấn nút Chia sẻ -> 'Thêm vào MH chính'.");
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('vmu_student_data');
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error("Lỗi load dữ liệu cũ");
      }
    }
  }, []);

  useEffect(() => {
    if (state.student || state.schedule.length > 0) {
      localStorage.setItem('vmu_student_data', JSON.stringify(state));
    }
  }, [state]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard 
          student={state.student} 
          schedule={state.schedule} 
          grades={state.grades} 
          onUpdateStudent={(student) => setState(prev => ({ ...prev, student }))}
          onNavigate={setActiveTab}
        />;
      case 'schedule':
        return <Schedule 
          items={state.schedule} 
          onUpdateSchedule={(schedule) => setState(prev => ({ ...prev, schedule }))}
        />;
      case 'grades':
        return <Grades 
          items={state.grades} 
          onUpdateGrades={(grades) => setState(prev => ({ ...prev, grades }))}
        />;
      case 'assistant':
        return <ChatBot context={{ student: state.student, schedule: state.schedule, grades: state.grades }} />;
      case 'import':
        return <ImportData setAppState={setState} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 flex-col lg:flex-row safe-area-pb">
      {showInstallBanner && (
        <div className="fixed top-20 left-4 right-4 z-[60] bg-[#004a99] text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-white/20 animate-in slide-in-from-top-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold">Cài đặt App VMU</p>
              <p className="text-[10px] opacity-80">Sử dụng mượt mà như app thật</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleInstallApp} className="bg-white text-[#004a99] px-4 py-2 rounded-xl text-xs font-bold shadow-lg">Cài đặt</button>
            <button onClick={() => setShowInstallBanner(false)} className="p-1 opacity-60"><X className="w-5 h-5" /></button>
          </div>
        </div>
      )}

      <header className="lg:hidden bg-[#004a99]/95 backdrop-blur-md text-white p-4 flex items-center justify-between sticky top-0 z-30 shadow-md safe-area-pt">
        <div className="flex items-center gap-2">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-lg"><Menu className="w-6 h-6" /></button>
          <span className="font-bold text-lg tracking-tight">VMU Assistant</span>
        </div>
        <Ship className="w-6 h-6 text-blue-300" />
      </header>

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto w-full max-w-full">
        <div className="max-w-7xl mx-auto pb-20 lg:pb-0">
          {renderContent()}
        </div>
      </main>

      {activeTab !== 'assistant' && state.student && (
        <button 
          onClick={() => setActiveTab('assistant')}
          className="fixed bottom-6 right-6 w-16 h-16 bg-[#004a99] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40 lg:z-50 border-4 border-white"
        >
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8V4m0 0L9 7m3-3l3 3M4 12h4m0 0l-3-3m3 3l-3 3M20 12h-4m0 0l3-3m-3 3l3 3M12 16v4m0 0l-3-3m3 3l3 3" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default App;
