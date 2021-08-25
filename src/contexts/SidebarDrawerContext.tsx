import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { createContext, ReactNode, useContext } from "react";

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

type SidevarDrawerContextData = UseDisclosureReturn;

const SidevarDrawerContext = createContext({} as SidevarDrawerContextData);

export function SidebarDrawerProvider({children}: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose()
  }, [router.asPath])

  return (
    <SidevarDrawerContext.Provider value={disclosure}>
      {children}
    </SidevarDrawerContext.Provider>
  );
}

export const useSidebarDrawer = () => useContext(SidevarDrawerContext);