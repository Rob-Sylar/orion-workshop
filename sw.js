// Orion Workshop offline cache: pages load fresh when online (so new tools appear straight away)
// and fall back to the saved copy with no signal. Icons and other files use the saved copy first.
const CACHE='orion-workshop-v2';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest','./icons/icon-192.png'])).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  const page=r.mode==='navigate'||(r.headers.get('accept')||'').includes('text/html');
  e.respondWith(caches.open(CACHE).then(c=>{
    const net=fetch(r).then(res=>{if(res&&res.ok)c.put(r,res.clone());return res;});
    if(page)return net.catch(()=>c.match(r).then(hit=>hit||c.match('./')));
    return c.match(r).then(hit=>hit||net);
  }));
});
