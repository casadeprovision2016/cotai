
import { ReactNode } from 'react';
import Sidebar from '../navigation/Sidebar';
import Header from '../common/Header';

interface AppShellProps {
  children: ReactNode;
  title: string;
}

const AppShell = ({ children, title }: AppShellProps) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;
