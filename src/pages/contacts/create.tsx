import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";
import Link from "next/link";

import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from "../../services/api";
import { useRouter } from "next/router";
import Router from "next/router";

type CreateContactFormData = {
  name: string;
  fone: string;
  email: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  fone: yup.string().required('Fone obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido')
});

export default function CreateContact() {
  const router = useRouter();

  const {register, handleSubmit, formState} = useForm({
      resolver: yupResolver(createUserFormSchema)
  });

  const {errors} = formState;

  const handleCreateContact: SubmitHandler<CreateContactFormData> = async (values) => {
      try{
        api.post('/contato', {
          name : values.name, 
          fone : values.fone,
          email: values.email,
          id_usuario : localStorage.getItem("id_usuario")
        });
      }
      catch(err){
        alert('erro ao tentar incluir usuário!');
      }

      alert('Contato criado com sucesso!');

      router.push('/dashboard');
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
            onSubmit={handleSubmit(handleCreateContact)}
        >
          <Heading size="lg" fontWeight="normal">Criar Contato</Heading>

          <Divider my="6" borderColor="gray.700"/>

          <VStack spacing="8"> 
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input 
                name="name" 
                label="Nome" 
                error={errors.name}
                {...register('name')} 
              />

              <Input 
                name="fone" 
                label="Telefone" 
                error={errors.fone}
                {...register('fone')}
              />

              <Input 
                name="email" 
                type="email" 
                label="E-mail" 
                error={errors.email}
                {...register('email')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/dashboard" passHref>
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