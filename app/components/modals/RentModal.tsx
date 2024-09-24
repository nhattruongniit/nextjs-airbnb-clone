'use client'
import React from 'react'
import Modal from './Modal'

import { useRentModal } from '@/app/hooks/useRentModal'

import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';

// mocks
import { categories } from '@/app/mocks/categories'
import { FieldValues, useForm } from 'react-hook-form';

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