import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { NewPuppyForm } from '@/components/NewPuppyForm';
import { PageWrapper } from '@/components/PageWrapper';
import { PuppiesList } from '@/components/PuppiesList';
import { Search } from '@/components/Search';
import { Shortlist } from '@/components/Shortlist';
import { Filters, PaginatedResponse, Puppy, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useRef } from 'react';

export default function App({ puppies, filters }: { puppies: PaginatedResponse<Puppy>, filters: Filters }) {
    return (
        <PageWrapper>
            <Container>
                <Header />
                <Main paginatePuppies={puppies} />
            </Container>
        </PageWrapper>

    );
}

function Main({ paginatePuppies }: { paginatePuppies: PaginatedResponse<Puppy> }) {
    const { auth } = usePage<SharedData>().props;
const mainRef = useRef<HTMLElement>(null);
    return (
        <main ref={mainRef} className="scroll-mt-6">
            <div className="mt-24 grid gap-8 sm:grid-cols-2">
                <Search />
                {auth.user && <Shortlist puppies={paginatePuppies.data} />}
            </div>
            <PuppiesList puppies={paginatePuppies} />
            {auth.user && <NewPuppyForm mainRef={mainRef} />}
        </main>
    );
}
