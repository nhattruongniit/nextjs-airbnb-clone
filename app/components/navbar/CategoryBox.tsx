'use client';
import React from 'react';
import clsx from 'clsx';
import { IconType } from 'react-icons/lib';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

interface CategoryBoxProps {
  category: {
    label: string;
    icon: IconType;
    description: string;
  },
  selected?: boolean
}

function CategoryBox({ category, selected }: CategoryBoxProps) {
  const router = useRouter();
  const params = useSearchParams();
  const Icon = category.icon;

  const handleClick = React.useCallback(() => {
    let currentQuery = {};
    if(params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery:any = {
      ...currentQuery,
      category: category.label
    }

    if(params?.get('category') === category.label) {
      delete updatedQuery.category
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, {
      skipNull: true
    });

    router.push(url)
  }, [category.label, params, router])

  return (
    <div 
      onClick={handleClick}
      className={clsx(
        'flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer', 
        selected ? 'border-b-neutral-800' : 'border-transparent',
        selected ? 'text-neutral-800' : 'text-neutral-500'
      )}
    >
      <Icon size={26} />
      <div className='font-medium text-sm'>{category.label}</div>
    </div>
  )
}

export default CategoryBox