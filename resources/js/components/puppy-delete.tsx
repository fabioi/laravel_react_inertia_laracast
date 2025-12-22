import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';

export function PuppyDelete() {
    return (
        <Button size="icon" variant="destructive">
            <TrashIcon className="size-4" />
        </Button>
    );
}
