import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { title, description, imageSrc, category, roomCount, bathRoomCount, guestCount, location, price } = body;

  Object.keys(body).forEach(key => {
    if(!body[key]) {
      return NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathRoomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price),
      userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
}