import React from 'react'

import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById'
import getReservation from "@/app/actions/getReservation";

import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import ListingClient from './ListingClient';

interface IParams {
  listingId?: string
}

async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingById(params);
  const reservartions = await getReservation(params);
  const currentUser = await getCurrentUser();

  if(!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ListingClient 
        listing={listing}
        reservations={reservartions}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default ListingPage