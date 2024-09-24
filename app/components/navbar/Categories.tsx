'use client';
import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// components
import Container from '../Container';
import CategoryBox from './CategoryBox';

// mocks
import { categories } from '@/app/mocks/categories';

function Categories() {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if(!isMainPage) return null;

  return (
    <Container>
      <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
        {categories.map(item => (
          <CategoryBox 
            key={item.label}
            category={item}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories;