import { usePage } from "@inertiajs/react";
import clsx from "clsx";
import { Heart, LoaderCircle } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toggleLikedStatus } from "../queries";
import { Puppy, SharedData } from "../types";

export function LikeToggle({
  puppy,
  setPuppies,
}: {
  puppy: Puppy;
  setPuppies: Dispatch<SetStateAction<Puppy[]>>;
}) {
  const { auth } = usePage<SharedData>().props;
  const [pending, setPending] = useState(false);
  return (
    <button
      className={clsx('group', !auth.user && "cursor-not-allowed")}
      disabled={!auth.user}
      onClick={async () => {
        setPending(true);
        try {
          const updatedPuppy = await toggleLikedStatus(puppy.id);
          setPuppies((prevPups) => {
            return prevPups.map((existingPuppy) =>
              existingPuppy.id === updatedPuppy.id ? updatedPuppy : existingPuppy,
            );
          });
          setPending(false);
        } catch (error) {
          setPending(false);
        }
      }}
    >
      {pending ? (
        <LoaderCircle className="animate-spin stroke-slate-300" />
      ) : (
        <Heart
          className={
            auth.user && puppy.likedBy.includes(auth.user.id)
              ? "fill-pink-500 stroke-none"
              : "stroke-slate-200 group-hover:stroke-slate-300"
          }
        />
      )}
    </button>
  );
}
