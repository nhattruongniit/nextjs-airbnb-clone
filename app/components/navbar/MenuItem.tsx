'use client';

import React from 'react'

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

function MenuItem({ onClick, label }: MenuItemProps) {
  return (
    <div
      className='px-3 py-4 hover:bg-neutral-100 transition font-semibold'
      onClick={onClick}
    >
      {label}
    </div>
  )
}

export default MenuItem