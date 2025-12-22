import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Puppy } from '@/types';
import { useForm } from '@inertiajs/react';
import { TrashIcon } from 'lucide-react';

export function PuppyDelete({ puppy }: { puppy: Puppy }) {
    const { processing, delete: destroy } = useForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        destroy(route('puppies.destroy', puppy), {
            preserveScroll: false,
        });
    };

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="group/delete bg-background/30 hover:bg-background" size="icon" variant="secondary" aria-label={`Delete ${puppy.name}`}>
                        <TrashIcon className="size-4 group-hover/delete:text-destructive" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>Who in their right mind would delete such a cute puppy? Seriously </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <form onSubmit={handleSubmit} method="POST">
                            <AlertDialogAction type="submit" disabled={processing}>
                                {processing ? 'Deleting...' : `Delete ${puppy.name}`}
                            </AlertDialogAction>
                        </form>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
