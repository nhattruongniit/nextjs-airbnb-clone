import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-hot-toast';
import { SafeUser } from '../types';
import { useLoginModal } from './useLoginModal';

interface IUserFavorite {
  listingId: string;
  currentUser: SafeUser | null | undefined;
}

export const useFavorite = ({ listingId, currentUser }: IUserFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorite = React.useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if(!currentUser) {
      return loginModal.onOpen();
    }

    try { 
      let request = () => axios.post(`/api/favorites/${listingId}`);
      if(hasFavorite) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
      }

      await request();
      router.refresh();
      toast.success('Favorite updated');
    } catch (_) {
      toast.error('Something went wrong');
    }
  }

  return { hasFavorite, toggleFavorite };
}