import { Stack } from "@chakra-ui/react";
import { RiContactsBookLine} from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav(){
    return (
        <Stack spacing="12" align="flex-start">
            <NavSection title="GERAL">
                <NavLink icon={RiContactsBookLine} href="/dashboard">Dashboard</NavLink>
            </NavSection>
        </Stack>
    );
}