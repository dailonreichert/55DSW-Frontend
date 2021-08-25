import { Box, Button, Flex, Heading, Icon, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiAddLine, RiDeleteBinLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import api from "../../services/api";

interface Appointments {
    id: string;
    descricao: string;
    local: string;
    data: Date;
}

export default function ListAppointments() {
    const [appointments, setAppointments] = useState<Appointments[]>([]);

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })

    useEffect(() => {
        api.get<Appointments[]>('/compromisso', {
            params: {
                id_contato : 1,
                id_usuario : 1
            }
        })
        .then(response => setAppointments(response.data));
    }, [appointments]);

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
              <Sidebar/>

              <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                <Flex mb="8" justify="space-between" align="center">
                    <Heading size="lg" fontWeight="normal">Compromissos</Heading>

                    <Link href="/appointments/create" passHref>
                        <Button 
                        as="a" 
                        size="sm" 
                        fontSize="sm" 
                        colorScheme="pink" 
                        mr="6"
                        leftIcon={<Icon as={RiAddLine} fontSize="20"/>}>
                            Novo Compromisso
                        </Button>
                    </Link>
                </Flex>
              
                <Table colorScheme="whiteAlpha">
                    <Thead>
                        <Tr>
                            <Th>Descrição</Th>
                            <Th>Local</Th>
                            {isWideVersion && <Th>Data</Th>}
                            <Th width="1"></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {appointments.map(appointment => (
                            <Tr key={appointment.id}>
                                <Td>
                                    <Text>{appointment.descricao}</Text>
                                </Td>
                                    <Td> 
                                    <Text>{appointment.local}</Text>
                                    </Td>
                                {isWideVersion && <Td>
                                                        <Text>{moment(appointment.data).format('DD/MM/YYYY')}</Text>
                                                    </Td>}
                                <Td>
                                    <Link href="/contacts/update" passHref>
                                        <Button 
                                            as="a" 
                                            size="sm" 
                                            fontSize="sm" 
                                            colorScheme="red" 
                                            leftIcon={<Icon as={RiDeleteBinLine} fontSize="16"/>}>
                                            {isWideVersion ? 'Excluir' : ''}
                                        </Button>
                                    </Link>
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