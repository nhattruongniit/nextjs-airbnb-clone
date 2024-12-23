'use client'

import React from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { SafeReservation, SafeUser } from '../types'

import Heading from '../components/Heading';
import Container from '../components/Container';
import ListingCard from '../components/listings/ListingCard';
import toast from 'react-hot-toast';

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
}

function ReservationsClient({ reservations, currentUser }: ReservationsClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = React.useState<string>('');

  function onCancel(id: string) {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success('Reservation cancelled');
        router.refresh();
      })
      .catch(() => {
        toast.error('Failed to cancel reservation');
      })
      .finally(() => {
        setDeletingId('');
      });
  }
  
  return (
    <Container>
      <Heading 
        title="Your Reservations" 
        subTitle={`Welcome back, ${currentUser?.name}`}
      />

      <div
        className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'   
      >
        {reservations.map(reservation => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel='Cancel guest reservation'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default ReservationsClient