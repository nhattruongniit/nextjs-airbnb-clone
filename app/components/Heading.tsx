'use client';
import React from 'react'

interface HeadingProps {
  title: string;
  subTitle?: string;
  center?: boolean;
}

function Heading({ title, subTitle, center }: HeadingProps) {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className='text-2xl font-bold'>{title}</div>
      <div className='font-light text-neutral-500 mt-2'>{subTitle}</div>
    </div>
  )
}

export default Heading