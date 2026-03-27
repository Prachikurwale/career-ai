"use client";

import { createContext, useState, useContext, ReactNode } from "react";

type MobileMenuContextType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
};

const MobileMenuContext = createContext<MobileMenuContextType | undefined>(undefined);

export function MobileMenuProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <MobileMenuContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </MobileMenuContext.Provider>
  );
}

export function useMobileMenu() {
  const context = useContext(MobileMenuContext);
  if (!context) {
    throw new Error("useMobileMenu must be used within MobileMenuProvider");
  }
  return context;
}
