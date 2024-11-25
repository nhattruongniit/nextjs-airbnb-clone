import Container from '../components/Container';
import Heading from '../components/Heading';
import { SafeReservation, SafeUser } from '../types'

interface TripsClientProps {
  reservations?: SafeReservation[];
  currentUser?: SafeUser | null;
}

function TripsClient({ reservations, currentUser }: TripsClientProps) {
  return (
    <Container>
      <Heading 
        title='Trips'
        subTitle="Where you've been and where you're going"
      />
      <div
        className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'
      >

      </div>
    </Container>
  )
}

export default TripsClient