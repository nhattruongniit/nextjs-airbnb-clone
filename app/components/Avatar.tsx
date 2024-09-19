'use client';

import Image from 'next/image';
import React from 'react'

interface AvatarProps {
  src?: string | undefined | null;
}

function Avatar({ src }: AvatarProps) {
  return (
    <Image 
      className='rounded-full'
      height={30}
      width={30}
      alt='Avatar'
      src={src || "/images/placeholder.png"}
    />
  )
}

export default Avatar