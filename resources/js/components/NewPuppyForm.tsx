import { Dispatch, SetStateAction } from "react";
import { Puppy } from "../types";
import { useFormStatus } from "react-dom";
import { createPuppy } from "../queries";
import { ErrorBoundary } from "react-error-boundary";

export function NewPuppyForm({
  puppies,
  setPuppies,
}: {
  puppies: Puppy[];
  setPuppies: Dispatch<SetStateAction<Puppy[]>>;
}) {
  return (
    <div className="mt-12 flex items-center justify-between bg-white p-8 shadow ring ring-black/5">
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <pre>{JSON.stringify(error, null, 2)}</pre>
        )}
      >
        <form
          action={async (formData: FormData) => {
            // #region agent log
            const logEndpoint = 'http://127.0.0.1:7242/ingest/a4d1678e-921e-4a1e-9e4e-ae5c13838901';
            fetch(logEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/NewPuppyForm.tsx:23',message:'form action called',data:{name:formData.get('name'),origin:window.location.origin},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
            // #endregion
            try {
              const response = await createPuppy(formData);
              // #region agent log
              fetch('http://127.0.0.1:7242/ingest/a4d1678e-921e-4a1e-9e4e-ae5c13838901',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/NewPuppyForm.tsx:26',message:'createPuppy completed',data:{hasData:!!response.data},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
              // #endregion
              if (response.data) {
                setPuppies([...puppies, response.data]);
              }
            } catch (error) {
              // #region agent log
              const logEndpoint = 'http://127.0.0.1:7242/ingest/a4d1678e-921e-4a1e-9e4e-ae5c13838901';
              const errorData = error instanceof Error ? {errorName:error.name,errorMessage:error.message,stack:error.stack} : {errorName:'Unknown',errorMessage:String(error)};
              const isNetworkError = error instanceof TypeError && (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('Failed'));
              fetch(logEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/NewPuppyForm.tsx:35',message:'form action error caught',data:{...errorData,errorType:typeof error,isNetworkError,origin:window.location.origin},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
              // #endregion
            }
          }}
          className="mt-4 flex w-full flex-col items-start gap-4"
        >
          <div className="grid w-full gap-6 md:grid-cols-3">
            <fieldset className="flex w-full flex-col gap-1">
              <label htmlFor="name">Name</label>
              <input
                required
                className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                id="name"
                type="text"
                name="name"
              />
            </fieldset>
            <fieldset className="flex w-full flex-col gap-1">
              <label htmlFor="trait">Personality trait</label>
              <input
                required
                className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                id="trait"
                type="text"
                name="trait"
              />
            </fieldset>
            <fieldset className="col-span-2 flex w-full flex-col gap-1">
              <label htmlFor="image_url">Profile pic</label>
              <input
                className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                id="image_url"
                type="file"
                name="image_url"
              />
            </fieldset>
          </div>
          <SubmitButton />
        </form>
      </ErrorBoundary>
    </div>
  );
}

function SubmitButton() {
  const status = useFormStatus();
  return (
    <button
      className="mt-4 inline-block rounded bg-cyan-300 px-4 py-2 font-medium text-cyan-900 hover:bg-cyan-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-200"
      type="submit"
      disabled={status.pending}
    >
      {status.pending
        ? `Adding ${status?.data?.get("name") || "puppy"}...`
        : "Add puppy"}
    </button>
  );
}
