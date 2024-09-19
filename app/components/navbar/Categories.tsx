import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// react icon
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiBarn, GiBoatFishing, GiCastle, GiCaveEntrance, GiDesert, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';

// components
import Container from '../Container';
import CategoryBox from './CategoryBox';

export const categories =  [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This is property in close to the beach!'
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This is property has windmills!'
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This is property in modern!'
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This is property in countryside!'
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This is property has a pool!'
  },
  {
    label: 'Island',
    icon: GiIsland,
    description: 'This is property is on islan!'
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This is property is on lake!'
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This is property is on skiing!'
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This is property is on castles!'
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This is property is on camping!'
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This is property is on arctic!'
  },
  {
    label: 'Cave',
    icon: GiCaveEntrance,
    description: 'This is property is on cave!'
  },
  {
    label: 'Desert',
    icon: GiDesert,
    description: 'This is property is on desert!'
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This is property is on barns!'
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This is property is on lux!'
  },
]

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

export default Categories