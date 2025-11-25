import { usePage } from "@inertiajs/react";
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
      className="group"
      onClick={async () => {
        // #region agent log
        const logEndpoint = 'http://127.0.0.1:7242/ingest/a4d1678e-921e-4a1e-9e4e-ae5c13838901';
        fetch(logEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/LikeToggle.tsx:18',message:'onClick called',data:{puppyId:puppy.id,origin:window.location.origin},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        setPending(true);
        try {
          const updatedPuppy = await toggleLikedStatus(puppy.id);
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/a4d1678e-921e-4a1e-9e4e-ae5c13838901',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/LikeToggle.tsx:22',message:'toggleLikedStatus completed',data:{puppyId:updatedPuppy?.id},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
          // #endregion
          setPuppies((prevPups) => {
            return prevPups.map((existingPuppy) =>
              existingPuppy.id === updatedPuppy.id ? updatedPuppy : existingPuppy,
            );
          });
          setPending(false);
        } catch (error) {
          // #region agent log
          const logEndpoint = 'http://127.0.0.1:7242/ingest/a4d1678e-921e-4a1e-9e4e-ae5c13838901';
          const errorData = error instanceof Error ? {errorName:error.name,errorMessage:error.message,stack:error.stack} : {errorName:'Unknown',errorMessage:String(error)};
          const isNetworkError = error instanceof TypeError && (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('Failed'));
          fetch(logEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/LikeToggle.tsx:33',message:'onClick error caught',data:{...errorData,errorType:typeof error,isNetworkError,origin:window.location.origin},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
          // #endregion
          setPending(false);
        }
      }}
    >
      {pending ? (
        <LoaderCircle className="animate-spin stroke-slate-300" />
      ) : (
        <Heart
          className={
            puppy.likedBy.includes(auth.user.id)
              ? "fill-pink-500 stroke-none"
              : "stroke-slate-200 group-hover:stroke-slate-300"
          }
        />
      )}
    </button>
  );
}
