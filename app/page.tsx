import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";

import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if(listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
   <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: any) => (
            <div key={listing.id}>
              <ListingCard 
                key={listing.id}
                data={listing}
                currentUser={currentUser}
              />
            </div>
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
