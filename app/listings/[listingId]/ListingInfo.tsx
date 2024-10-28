
import React from 'react';
import { IconType } from 'react-icons';
import { useCountries } from '@/app/hooks/useCountries';
import { SafeListing, SafeUser } from '@/app/types';
import Avatar from '@/app/components/Avatar';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/app/components/Map'), { ssr: false });

interface ListingInfoProps {
  listing: SafeListing & {
    user: SafeUser
  };
  category: {
    icon: IconType;
    label: string;
    description: string;
  } | undefined;
}
 
function ListingInfo({ listing, category }: ListingInfoProps) {
  const { getByValue } = useCountries();
  const coordinate = getByValue(listing.locationValue)?.latlng;

  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div className='text-xl font-semibold flex items-center gap-2'>
          <div>Hosted by {listing.user?.name}</div>
          <Avatar src={listing.user?.image} />
        </div>
        <div className='flex items-center gap-4 font-light text-neutral-500'>
          <div>{listing.guestCount} guests</div>
          <div>{listing.roomCount} rooms</div>
          <div>{listing.bathRoomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {listing.category && (
        <ListingCategory 
          icon={category?.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <div className='text-lg font-light text-neutral-500'>
        {listing.description}
      </div>
      <hr />
      <Map center={coordinate} />
    </div>
  )
}

export default ListingInfo