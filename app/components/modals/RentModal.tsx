'use client'
import React from 'react'
import Modal from './Modal'
import { FieldValues, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { useRentModal } from '@/app/hooks/useRentModal'
import { categories } from '@/app/mocks/categories'

import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from '../inputs/CountrySelect';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

function RentModal() {
  const rentModal = useRentModal();
  const [step, setStep] = React.useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors
    },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  });

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');

  const Map = React.useMemo(() => {
    return dynamic(() => import('../Map'), {
      ssr: false
    })
  }, [location])

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onBack = () => {
    setStep(prevStep => prevStep - 1);
  }

  const onNext = () => {
    setStep(prevStep => prevStep + 1);
  }

  const actionLabel = React.useMemo(() => {
    if(step === STEPS.PRICE) {
      return 'Create';
    }
    return 'Next';
  }, [step])

  const secondaryActionLabel = React.useMemo(() => {
    if(step === STEPS.CATEGORY) {
      return undefined
    }
    return 'Back';
  }, [step])

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading 
        title="Which of these best describes your place?"
        subTitle="Pick a category"
      />
      <div
        className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'
      >
        {categories.map(item => {
          return (
            <div key={item.label} className='col-span-1'>
              <CategoryInput 
                onClick={(category) => setCustomValue('category', category)}
                selected={category === item.label}
                label={item.label}
                icon={item.icon}
              />
            </div>
          )
        })}

      </div>

    </div>
  )

  if(step === STEPS.LOCATION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading 
          title="Where is your place located?" 
          subTitle="Help guests find you!"
        />
        <CountrySelect 
          value={location}
          onChange={value => setCustomValue('location', value)}
        />

        <Map 
          center={location?.latlng}
        />
      </div>
    )
  }

  if(step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading 
          title="Share some basics about your place"
          subTitle="What amenities do you have?"
        />
        <Counter 
          title="Number of guests"
          subtitle='How many guests can your place accommodate?'
          value={guestCount}
          onChange={value => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle='How many rooms do you have?'
          value={roomCount}
          onChange={value => setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle='How many bathrooms do you have?'
          value={bathroomCount}
          onChange={value => setCustomValue('bathroomCount', value)}
        />
      </div>
    )
  }

  if(step === STEPS.IMAGES) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading 
          title="Add a photo of your place"
          subTitle="Show guests what your place looks like!"
        />
        <ImageUpload />
      </div>
    )
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home!"
      body={bodyContent}
    />
  )
}

export default RentModal