import React from 'react'

import EmptyState from '../components/EmptyState'
import ClientOnly from '../components/ClientOnly'

import getCurrentUser from '../actions/getCurrentUser'
import getReservation from '../actions/getReservation'
import ReservationsClient from './ReservationsClient'
import { SafeReservation } from '../types'

async function Reservations() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthenticated"
          subtitle="Please login to see your reservations"
        />
      </ClientOnly>
    )
  }
  
  const reservations = await getReservation({
    userId: currentUser.id
  });

  if(reservations?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations"
          subtitle="You don't have any reservations yet"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ReservationsClient 
        reservations={reservations as SafeReservation[]} 
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default Reservations