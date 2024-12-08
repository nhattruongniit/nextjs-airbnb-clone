'use client'

import React from 'react'
import qs from 'query-string'
import { formatISO } from 'date-fns'
import { useSearchParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Range } from 'react-date-range'

import Modal from './Modal'
import { useSearchModal } from '@/app/hooks/useSearchModal'
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect'
import Heading from '../Heading'
import Calendar from '../inputs/Calendar'
import Counter from '../inputs/Counter'

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}

function SearchModal() {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [location, setLocation] = React.useState<CountrySelectValue>();
  const [step, setStep] = React.useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = React.useState(1);
  const [roomCount, setRoomCount] = React.useState(1);
  const [bathroomCount, setBathroomCount] = React.useState(1);
  const [dateRange, setDateRange] = React.useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })

  const Map = dynamic(() => import('@/app/components/Map'), {
    ssr: false
  });

  const onBack = () => {
    setStep(prevState => prevState - 1);
  }

  const onNext = () => {
    setStep(prevState => prevState + 1);
  };
 
  const onSubmit = () => {
    if(step !== STEPS.INFO) {
      return onNext();
    }
    let currentQuery = {};

    if(params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    }

    if(dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if(dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    setStep(STEPS.LOCATION);
    searchModal.onClose(); 
    router.push(url);
  }

  const actionLabel = React.useMemo(() => {
    if(step === STEPS.INFO) {
      return 'Search';
    } 
    return 'Next'
  }, [step]);

  const secondaryActionLabel = React.useMemo(() => { 
    if(step === STEPS.LOCATION) {
      return undefined;
    }
    return 'Back'; 
  }, [step]);

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading 
        title='Where are you going?'
        subTitle='Find the perfect location!'
      />

      <CountrySelect 
        value={location}
        onChange={value => {
          setLocation(value);
        }}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )

  if(step === STEPS.DATE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading 
          title='When do you plan to go?'
          subTitle='Make sure everyone is available!'
        />
        <Calendar
          value={dateRange}
          onChange={range => setDateRange(range.selection)}
        />
      </div>
    )
  }
  
  if(step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading 
          title='How many guests are you bringing?'
          subTitle='Make sure everyone is comfortable!'
        />

        <Counter 
          title="Guests"
          subtitle='How many guests are you bringing?'
          value={guestCount}
          onChange={value => setGuestCount(value)}
        />
        <Counter 
          title="Rooms"
          subtitle='How many rooms do you need?'
          value={roomCount}
          onChange={value => setRoomCount(value)}
        />
        <Counter 
          title="Bathrooms"
          subtitle='How many bathrooms do you need?'
          value={bathroomCount}
          onChange={value => setBathroomCount(value)}
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title='Filters'
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  )
}

export default SearchModal