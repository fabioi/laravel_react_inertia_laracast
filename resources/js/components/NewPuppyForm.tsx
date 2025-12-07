import { useForm } from "@inertiajs/react";
import { useRef } from "react";

export function NewPuppyForm({mainRef}: {
  mainRef: React.RefObject<HTMLElement | null>;
}) {

  const {post, data, setData, errors, reset, processing} = useForm<{
    name: string;
    trait: string;
    image: File | null;
  }>({
    name: '',
    trait: '',
    image: null as File | null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
    <div className="mt-12 flex items-center justify-between bg-white p-8 shadow ring ring-black/5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            post(route('puppies.store'), {
              preserveScroll: true,
              onSuccess: () => {
                reset();
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
                if(typeof window !== 'undefined') {
                 mainRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
                }
              },
            });
          }}
          className="mt-4 flex w-full flex-col items-start gap-4"
        >
          <div className="grid w-full gap-6 md:grid-cols-3">
            <fieldset className="flex w-full flex-col gap-1">
              <label htmlFor="name">Name</label>
              <input
                value={data.name}
                
                onChange={(e) => setData('name', e.target.value)}
                className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                id="name"
                type="text"
                name="name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </fieldset>
            <fieldset className="flex w-full flex-col gap-1">
              <label htmlFor="trait">Personality trait</label>
              <input
                value={data.trait}
                
                onChange={(e) => setData('trait', e.target.value)}
                className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                id="trait"
                type="text"
                name="trait"
              />
              {errors.trait && <p className="text-red-500 text-xs mt-1">{errors.trait}</p>}
            </fieldset>
            <fieldset className="col-span-2 flex w-full flex-col gap-1">
              <label htmlFor="image">Profile pic</label>
              <input
                ref={fileInputRef}
                onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
                className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                id="image"
                type="file"
                name="image"
              />
              {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
            </fieldset>
          </div>
          <button
      className="mt-4 inline-block rounded bg-cyan-300 px-4 py-2 font-medium text-cyan-900 hover:bg-cyan-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-200"
      type="submit"
      disabled={processing}
    >
      {processing ? `Adding ${data.name}`: "Add puppy"}
    </button>
        </form>
        {/* <pre> 
          {JSON.stringify(errors,null,2)}
        </pre> */}
    </div>
    </>
  );
}


