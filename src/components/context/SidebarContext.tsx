'use client';
import { createContext, useEffect, useState, useContext } from 'react';
import useClient from '../hooks/useClient';

type SideBarContextType = {
  showSidebar: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SideBarContextType | null>(null);
const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const isClient = useClient();
  const initialState: boolean =
    isClient && (JSON.parse(localStorage.getItem('sidebar')!) ?? true);

  const [showSidebar, setShowSidebar] = useState<boolean>(initialState);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('sidebar', JSON.stringify(showSidebar));
    }
  }, [showSidebar]);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };
  const contextValue = {
    showSidebar,
    toggleSidebar,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

const useSidebar = () => {
  return useContext(SidebarContext) as SideBarContextType;
};

export { SidebarProvider, useSidebar };
