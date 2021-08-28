import { Box, Button, Flex, Heading, Icon, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { RiAddLine, RiBookMarkLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import api from '../services/api';

interface Contacts {
    id: string;
    name: string;
    fone: string;
    email: string;
}

export default function Dashboard() {
    const [contacts, setContacts] = useState<Contacts[]>([]);

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })

    useEffect(() => {
      api.get<Contacts[]>('/contato',{
        params: {
          id_usuario: localStorage.getItem("id_usuario"),
        }
    }).then(response => setContacts(response.data));
    }, []);

    function handleListAppointment(id_contato : string) {
        localStorage.setItem("id_contato", id_contato);

        Router.push('/appointments');
    }

    function handleUpdateContact(id_contato: string){
        localStorage.setItem("id_contato", id_contato);

        Router.push('/contacts/update');
    }

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
              <Sidebar/>

              <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                <Flex mb="8" justify="space-between" align="center">
                    <Heading size="lg" fontWeight="normal">Contatos</Heading>

                    <Link href="/contacts/create" passHref>
                        <Button 
                        as="a" 
                        size="sm" 
                        fontSize="sm" 
                        colorScheme="pink" 
                        mr="6"
                        leftIcon={<Icon as={RiAddLine} fontSize="20"/>}>
                            Novo Contato
                        </Button>
                    </Link>
                </Flex>
              
                <Table colorScheme="whiteAlpha">
                    <Thead>
                        <Tr>
                            <Th>Nome</Th>
                            <Th>Fone</Th>
                            {isWideVersion && <Th>E-mail</Th>}
                            <Th width="1"></Th>
                            <Th width="1"></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {contacts.map(contact => (
                            <Tr key={contact.id}>
                                <Td>
                                    <Text fontWeight="bold">{contact.name}</Text>
                                </Td>
                                    <Td>{contact.fone}</Td>
                                {isWideVersion && <Td>
                                                        <Text>{contact.email}</Text>
                                                    </Td>}
                                <Td>
                                    <Button 
                                        as="a" 
                                        size="sm" 
                                        fontSize="sm" 
                                        colorScheme="whiteAlpha" 
                                        onClick={() => handleUpdateContact(contact.id)}
                                        leftIcon={<Icon as={RiPencilLine} fontSize="16"/>}>
                                        {isWideVersion ? 'Editar' : ''}
                                    </Button>
                                </Td>
                                <Td>
                                    
                                <Button 
                                    as="a" 
                                    size="sm" 
                                    fontSize="sm" 
                                    colorScheme="facebook" 
                                    onClick={() => handleListAppointment(contact.id)}
                                    leftIcon={<Icon as={RiBookMarkLine} fontSize="16"/>}>
                                    {isWideVersion ? 'Compromissos' : ''}
                                </Button>
                                    
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
              </Box>
            </Flex>
        </Box>

    );
}