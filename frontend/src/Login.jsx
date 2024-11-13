'use client';

import { Button, Heading, Input, VStack } from '@chakra-ui/react';
import { Field } from './components/ui/field';
import { PasswordInput } from './components/ui/password-input';
import { useForm } from 'react-hook-form';

const url =
  process.env.NODE_ENV === 'production'
    ? 'https://my-typing-dojo.onrender.com/'
    : 'http://localhost:3000/';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    // let response = await fetch(
    //   `${url}signup`
    // );
    // response = await response.json();
    // console.log('server response:  ', response);

    const loginUser = {
      username: data.username,
      password: data.password,
    };
    let response = await fetch(`${url}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: loginUser,
      }),
    });
    response = await response.json();
    console.log('signup server response:  ', response);
  });

  return (
    <form onSubmit={onSubmit}>
      <VStack>
        <Heading fontSize={'3xl'} mb={6}>
          My-typing-dojo
        </Heading>
        <Field
          label="Username"
          invalid={!!errors.username}
          errorText={errors.username?.message}
        >
          <Input
            {...register('username', { required: 'Username is required' })}
          />
        </Field>
        <Field
          label="Password"
          invalid={!!errors.password}
          errorText={errors.password?.message}
        >
          <PasswordInput
            {...register('password', { required: 'Password is required' })}
          />
        </Field>
        <Button
          variant="subtle"
          px="8"
          mx="4"
          textStyle="md"
          mt="4"
          type="submit"
        >
          Submit
        </Button>
      </VStack>
    </form>
  );
};
export default Login;
