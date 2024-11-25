import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';

import getCurrentUser from '../actions/getCurrentUser';
import getReservation from '../actions/getReservation';

import TripsClient from './TripsClient';

async function TripsPage() {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return (
      <ClientOnly>
        <EmptyState 
          title="Unauthenticated"
          subtitle="Please login"
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
          title="No trips found"
          subtitle="Look like you haven't booked any trips yet"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <TripsClient 
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default TripsPage