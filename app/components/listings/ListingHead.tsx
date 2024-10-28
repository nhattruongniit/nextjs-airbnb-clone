import React from 'react'
import Image from 'next/image';
import { useCountries } from '@/app/hooks/useCountries';
import { SafeListing, SafeUser } from '@/app/types'
import Heading from '../Heading';
import HeartButton from '../HeartButton';

interface ListingHeadProps {
  listing: SafeListing;
  currentUser?: SafeUser | null;
}

function ListingHead({ listing, currentUser }: ListingHeadProps) {
  const { getByValue } = useCountries();
  const location = getByValue(listing.locationValue);

  return (
    <>
      <Heading 
        title={listing.title}
        subTitle={`${location?.region}, ${location?.label}`}
      />
      <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
        <Image 
          src={listing.imageSrc}
          alt={listing.title}
          fill
          className='object-cover w-full'
        />
        <div className='absolute top-5 right-5'>
          <HeartButton 
            listingId={listing.id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  )
}

export default ListingHead