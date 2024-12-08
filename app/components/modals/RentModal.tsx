'use client'
import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { useRentModal } from '@/app/hooks/useRentModal'
import { categories } from '@/app/mocks/categories'

import Modal from './Modal'
import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from '../inputs/CountrySelect';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

function RentModal() {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = React.useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = React.useState(false);

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
      bathRoomCount: 1,
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
  const bathRoomCount = watch('bathRoomCount');
  const imageSrc = watch('imageSrc');

  const Map = dynamic(() => import('../Map'), {
    ssr: false
  });

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if(step !== STEPS.PRICE) {
      onNext();
      return;
    }

    setIsLoading(true);
    axios.post('/api/listings', data)
      .then(() => {
        toast.success('Listing created successfully!');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error('An error occurred. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          value={bathRoomCount}
          onChange={value => setCustomValue('bathRoomCount', value)}
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
        <ImageUpload 
          value={imageSrc}
          onChange={value => setCustomValue('imageSrc', value)}
        />
      </div>
    )
  }

  if(step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading 
          title="How would you describe your place?"
          subTitle="Short and sweet works best!"
        />
        <Input 
          label="Title"
          id="title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input 
          label="Description"
          id="description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  if(step === STEPS.PRICE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading 
          title="Now, set your price"
          subTitle="How much do you charge per night?"
        />
        <Input 
          label="Price"
          id="price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home!"
      body={bodyContent}
    />
  )
}

export default RentModal