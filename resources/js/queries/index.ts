import { Puppy } from '../types';

// ------------------------------
// Add/remove from shortlist
// ------------------------------
export async function toggleLikedStatus(id: Puppy['id']) {
    // #region agent log
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const url = `${baseUrl}/api/puppies/${id}/like`;
    const logEndpoint = 'http://127.0.0.1:7242/ingest/a4d1678e-921e-4a1e-9e4e-ae5c13838901';
    const logData = {location:'queries/index.ts:7',message:'toggleLikedStatus called',data:{id,url,method:'PATCH',origin:baseUrl,userAgent:typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'};
    fetch(logEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(logData)}).catch(()=>{});
    // #endregion
    try {
        // #region agent log
        const logEndpoint = 'http://127.0.0.1:7242/ingest/a4d1678e-921e-4a1e-9e4e-ae5c13838901';
        fetch(logEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'queries/index.ts:12',message:'fetch called',data:{url,method:'PATCH'},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
            },
        });
        // #region agent log
        fetch(logEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'queries/index.ts:21',message:'fetch response received',data:{ok:response.ok,status:response.status,statusText:response.statusText,url:response.url,headers:Object.fromEntries(response.headers.entries())},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        if (!response.ok) {
            const errorData = await response.json();
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/a4d1678e-921e-4a1e-9e4e-ae5c13838901',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'queries/index.ts:22',message:'response not ok',data:{status:response.status,errorData},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'B'})}).catch(()=>{});
            // #endregion
            throw errorData;
        }
        const { data } = await response.json();
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/a4d1678e-921e-4a1e-9e4e-ae5c13838901',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'queries/index.ts:26',message:'toggleLikedStatus success',data:{puppyId:data?.id},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        return data;
    } catch (error) {
        // #region agent log
        const logEndpoint = 'http://127.0.0.1:7242/ingest/a4d1678e-921e-4a1e-9e4e-ae5c13838901';
        const errorData = error instanceof Error ? {errorName:error.name,errorMessage:error.message,stack:error.stack} : {errorName:'Unknown',errorMessage:String(error)};
        const isNetworkError = error instanceof TypeError && (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('Failed'));
        fetch(logEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'queries/index.ts:32',message:'toggleLikedStatus error',data:{...errorData,errorType:typeof error,url,isNetworkError,origin:baseUrl},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        throw error;
    }
}

// ------------------------------
// Add a new puppy
// ------------------------------
export async function createPuppy(formData: FormData) {
    // #region agent log
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const url = `${baseUrl}/api/puppies`;
    const logEndpoint = 'http://127.0.0.1:7242/ingest/a4d1678e-921e-4a1e-9e4e-ae5c13838901';
    fetch(logEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'queries/index.ts:48',message:'createPuppy called',data:{url,method:'POST',origin:baseUrl},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    try {
        // #region agent log
        const logEndpoint = 'http://127.0.0.1:7242/ingest/a4d1678e-921e-4a1e-9e4e-ae5c13838901';
        fetch(logEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'queries/index.ts:53',message:'fetch called',data:{url,method:'POST'},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
            },
        });
        // #region agent log
        fetch(logEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'queries/index.ts:62',message:'fetch response received',data:{ok:response.ok,status:response.status,statusText:response.statusText,url:response.url,headers:Object.fromEntries(response.headers.entries())},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        if (!response.ok) {
            const errorData = await response.json();
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/a4d1678e-921e-4a1e-9e4e-ae5c13838901',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'queries/index.ts:51',message:'response not ok',data:{status:response.status,errorData},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'B'})}).catch(()=>{});
            // #endregion
            throw errorData;
        }
        const data = await response.json();
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/a4d1678e-921e-4a1e-9e4e-ae5c13838901',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'queries/index.ts:55',message:'createPuppy success',data:{puppyId:data?.data?.id},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        return data;
    } catch (error) {
        // #region agent log
        const logEndpoint = 'http://127.0.0.1:7242/ingest/a4d1678e-921e-4a1e-9e4e-ae5c13838901';
        const errorData = error instanceof Error ? {errorName:error.name,errorMessage:error.message,stack:error.stack} : {errorName:'Unknown',errorMessage:String(error)};
        const isNetworkError = error instanceof TypeError && (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('Failed'));
        fetch(logEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'queries/index.ts:71',message:'createPuppy error',data:{...errorData,errorType:typeof error,url,isNetworkError,origin:baseUrl},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        throw error;
    }
}
