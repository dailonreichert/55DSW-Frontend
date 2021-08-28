import { Button, Flex, HStack, Stack } from "@chakra-ui/react";

import { Input } from "../../components/Form/Input";
import Link from "next/link";

import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Logo } from "../../components/Header/Logo";
import api from "../../services/api";
import { useRouter } from "next/router";

type CreateUserFormData = {
    name: string;
    username: string;
    password: string;
}
  
const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    username: yup.string().required('Username obrigatório'),
    password: yup.string().required('Senha obrigatória').min(6, 'A senha precisa no mínimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'As sennhas precisam ser iguais')
});

export default function CreateUser() {
    const router = useRouter();

    const {register, handleSubmit, formState} = useForm({
        resolver: yupResolver(createUserFormSchema)
    });

    const {errors} = formState;

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
      try {
        await api.post('usuario', {
          name: values.name,
          username: values.username,
          senha: values.password
        });

        alert('Usuário criado com sucesso!');
        
        router.push('/');
      } catch (err) {
        if(err.response.status == 409){
          alert('Username já está em uso!');

          return;
        }

        alert('Erro ao cadastrar usuário!');
      }
    }

    return (
        <Flex 
          w="100vw"
          h="100vh"
          align="center"
          justify="center"
        >
          <Flex 
            as="form" 
            width="100%" 
            maxWidth={360}
            bg="gray.800"
            p="8"
            borderRadius={8}
            flexDir="column"
            onSubmit={handleSubmit(handleCreateUser)}
          >
            <Stack spacing="4">
              <Logo/>
              <Input 
                name="name" 
                type="name" 
                label="Nome" 
                error={errors.name}
                {...register('name')}
              /> 
              <Input 
                name="username" 
                type="username" 
                label="Username" 
                error={errors.username}
                {...register('username')}
              /> 
    
              <Input 
                name="password" 
                type="password" 
                label="Senha" 
                error={errors.password}
                {...register('password')}
              />
              <Input 
                name="password_confirmation" 
                type="password" 
                label="Confirmação da Senha"
                error={errors.password_confirmation}
                {...register('password_confirmation')}
               />
            </Stack>
    
            <Flex mt="8" justify="flex-end">
                <HStack spacing="4">
                <Link href="/" passHref>
                    <Button colorScheme="whiteAlpha">Cancelar</Button>
                </Link>
                <Button 
                    colorScheme="pink" 
                    type="submit"
                    isLoading={formState.isSubmitting}
                >
                    Criar
                </Button>
                </HStack>
            </Flex>
          </Flex>
        </Flex>
      );
}