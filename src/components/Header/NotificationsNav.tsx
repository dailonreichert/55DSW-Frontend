import { Button, HStack, Icon } from "@chakra-ui/react";
import Router from "next/router";
import { RiLogoutBoxLine, RiNotification3Line, RiUserAddLine } from "react-icons/ri";

export function NotificationsNav(){
    function handleLogOut(){
        localStorage.clear();

        Router.push('/');
    }

    return(
        <HStack 
          spacing={["6", "8"]}
          mx={["6", "8"]} 
          pr={["6", "8"]}
          py="1" 
          color="gray.300" 
          borderRightWidth={1} 
          borderColor="gray.700">
            <Icon as={RiNotification3Line} fontSize="20" />

            <Button background="gray.900" _hover={{color: 'gray.50'}} onClick={() => handleLogOut()}>
                <Icon as={RiLogoutBoxLine} fontSize="20" />
            </Button>
            
        </HStack>
    );
}