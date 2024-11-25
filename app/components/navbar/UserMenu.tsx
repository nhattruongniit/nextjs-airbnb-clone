'use client'
import React from 'react';
import { signOut } from 'next-auth/react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { SafeUser } from '@/app/types';


// components
import Avatar from '../Avatar';
import MenuItem from './MenuItem';

// hooks
import { useRentModal } from '@/app/hooks/useRentModal';
import { useRegisterModal } from '@/app/hooks/useRegisterModal';
import { useLoginModal } from '@/app/hooks/useLoginModal';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

function UserMenu({ currentUser }: UserMenuProps) {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal =  useRentModal();
  const [isOpen, setIsOpen] = React.useState(false);
  
  const toggleOpen = React.useCallback(() => {
    setIsOpen(prevState => !prevState)
  }, [])

  const onRent = React.useCallback(() => {
    if(!currentUser) {
      loginModal.onOpen();
      return;
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal])

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          onClick={onRent}
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
        > 
          Airbnb your home
        </div>  
        <div
          onClick={toggleOpen}
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:show-md transition'
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div 
          className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'
        >
          <div
            className='flex flex-col cursor-pointer'
          >
            {currentUser ? (
              <>
                <MenuItem 
                  onClick={() => router.push('/trips')}
                  label='My trips'
                />
                <MenuItem 
                  onClick={() => {}}
                  label='My reservations'
                />
                <MenuItem 
                  onClick={() => {}}
                  label='My properties'
                />
                <MenuItem 
                  onClick={onRent}
                  label='Airbnb my home'
                />
                <hr />
                <MenuItem 
                  onClick={() => signOut()}
                  label='Logout'
                />
              </>
            ) : (
              <>
                <MenuItem 
                  onClick={loginModal.onOpen}
                  label='Login'
                />
                <MenuItem 
                  onClick={registerModal.onOpen}
                  label='Sign up'
                />
              </>
            )}
           
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu