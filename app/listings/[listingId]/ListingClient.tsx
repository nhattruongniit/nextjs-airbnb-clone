'use client';

import React from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { Reservation } from '@prisma/client';
import toast from 'react-hot-toast';
import { Range } from 'react-date-range';

import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { categories } from '@/app/mocks/categories';

import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from './ListingInfo';
import ListingReservation from '@/app/components/listings/ListingReservation';

import { useLoginModal } from '@/app/hooks/useLoginModal';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}
interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser
  };
  currentUser?: SafeUser | null; 
}

function ListingClient({ reservations = [], listing, currentUser }: ListingClientProps) {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disableDates = React.useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      })
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(listing.price);
  const [dateRange, setDateRange] = React.useState<Range>(initialDateRange);

  const onCreateReservation = () => {
    if(!currentUser) {
      loginModal.onOpen();
      return;
    }
    setIsLoading(true);

    axios.post('/api/reservations', {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id
    }).then(() => {
      toast.success('Listing reserved!');
      setDateRange(initialDateRange);
      router.refresh();
    }).catch(() => {
      toast.error('Something went wrong.')
    }).finally(() => {
      setIsLoading(false);
    })
  };

  React.useEffect(() => {
    if(dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);
      if(dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price]);

  const category = React.useMemo(() => {
    return categories.find(item => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          <ListingHead 
            listing={listing}
            currentUser={currentUser}
          />
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            <ListingInfo 
              category={category}
              listing={listing}
            />
            <div className='order-first mb-10 md:order-last md:col-span-3'>
              <ListingReservation 
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value: any) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disableDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient