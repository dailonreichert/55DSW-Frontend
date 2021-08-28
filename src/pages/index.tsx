import {Button, Flex, Link, Stack, Text} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Input } from '../components/Form/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { Logo } from '../components/Header/Logo';
import { useRouter } from 'next/router';
import api from '../services/api';

type SignInFormData = {
  username: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  username: yup.string().required('Username obrigatório'),
  password: yup.string().required('Senha obrigatória')
});

export default function SignIn() {
  const router = useRouter();

  const {register, handleSubmit, formState} = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const {errors} = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    const data = {
      username : values.username,
      password : values.password
    }

    try{
      const response = await api.post('/usuario/login', {
        username: values.username, 
        senha: values.password
      });

      localStorage.setItem("id_usuario", String(response.data.id));

      router.push('/dashboard');
    } catch (err){
      alert('Username e/ou senha incorreto(s)!');
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
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Logo/>

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
            {...register('password')} />
        </Stack>

        <Button 
          type="submit" 
          mt="6" 
          colorScheme="pink" 
          size="lg" 
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>

        <Text 
          fontSize="sm" 
          mb="4" 
          mt="6"
        >
          Não tem uma conta? 
          <Link display="inline-block" href="/users/create">
                <Text ml="2" fontWeight="medium" color="pink.500">Cadastre-se</Text>
            </Link>
        </Text>
      </Flex>

    </Flex>
  );
}
