'use client';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import React from 'react';
import toast from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

// icons
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

// components
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';

// hooks
import { useRegisterModal } from '@/app/hooks/useRegisterModal';
import { useLoginModal } from '@/app/hooks/useLoginModal';

function RegisterModal() {
  const loginModal =  useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = React.useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { 
      errors 
    } 
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post('/api/register', data);
      toast.success(`Account created successfully.`);
      registerModal.onClose();
      loginModal.onOpen();
    } catch(error) {
      toast.error(`Something went wrong.`);
    }
    setIsLoading(false);
  }

  const toggle = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };
  
  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading 
        title='Welcome to Airbnb'
        subTitle='Create an account!'
      />
      <Input 
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id="password"
        type='password'
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button 
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button 
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='flex flex-row items-center justify-center gap-2'>
          <div>
            Already have an account?
          </div>
          <div 
            onClick={toggle}
            className='text-neutral-800 cursor-pointer hover:underline'
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal 
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal