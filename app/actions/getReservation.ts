import prisma from '@/app/libs/prismadb';

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservation(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;
    const query: any = {};

    if(listingId) {
      query.listingId = listingId;
    }
    if(userId) {
      query.userId = userId;
    }
    if(authorId) {
      query.listing = {
        userId: authorId
      };
    }

    const reservation = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createAt: 'desc'
      }
    });

    const safeReservation = reservation.map((reservation) => {
      return {
        ...reservation,
        createAt: reservation.createAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        listing: {
          ...reservation.listing,
          createAt: reservation.listing.createAt.toISOString(),
        }
      }
    });
    
    return safeReservation;
  } catch(error: any) {
    console.log(error);
  }
}