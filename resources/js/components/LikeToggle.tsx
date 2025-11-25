import { useForm, usePage } from "@inertiajs/react";
import clsx from "clsx";
import { Heart, LoaderCircle } from "lucide-react";
import { Puppy, SharedData } from "../types";


export function LikeToggle({
  puppy,
}: {
  puppy: Puppy;
}) {
  const { auth } = usePage<SharedData>().props;
  const {patch, processing} = useForm();
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      patch(route('puppies.like', puppy.id),{preserveScroll: true});
    }}>
      <button type="submit" disabled={!auth.user || processing} className={clsx('group', !auth.user && "cursor-not-allowed")}>
        {processing ? (
          <LoaderCircle className="size-4 animate-spin stroke-slate-300" />
        ) : (
          <Heart className={clsx(auth.user && puppy.likedBy.includes(auth.user.id) ? "fill-pink-500 stroke-none" : "stroke-slate-200 group-hover:stroke-slate-300", 'group-data-loading:hidden')} />
        )}
      </button>
    </form>
  );
}
