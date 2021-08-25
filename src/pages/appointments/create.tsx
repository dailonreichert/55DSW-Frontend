import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";
import Link from "next/link";

import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type CreateAppointmentFormData = {
  description: string;
  local: string;
  date: Date;
}

const createUserFormSchema = yup.object().shape({
  description: yup.string().required('Descrição obrigatória'),
  local: yup.string().required('Local obrigatório'),
  date: yup.date().required('Data obrigatória').min('01/01/1900', 'A data precisa ser maior que 01/01/1900')
});

export default function CreateAppointments() {
  const {register, handleSubmit, formState} = useForm({
      resolver: yupResolver(createUserFormSchema)
  });

  const {errors} = formState;

  const handleCreateUser: SubmitHandler<CreateAppointmentFormData> = async (values) => {
      console.log(values);
      await new Promise(resolve => setTimeout(resolve, 2000));
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar/>
        <Box 
            as="form"
            flex="1" 
            borderRadius={8} 
            bg="gray.800" 
            p={["6", "8"]}
            onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar Compromisso</Heading>

          <Divider my="6" borderColor="gray.700"/>

          <VStack spacing="8"> 
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input 
                name="description" 
                label="Descrição" 
                type="description"
                error={errors.description}
                {...register('description')} 
              />

              <Input 
                name="local" 
                label="Local" 
                error={errors.local}
                {...register('local')}
              />

              <Input 
                name="date" 
                type="date" 
                label="Data" 
                error={errors.date}
                {...register('date')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>    
                <Button 
                  colorScheme="pink" 
                  type="submit"
                  isLoading={formState.isSubmitting}
                >
                  Salvar
                </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}