When I clicked the logout button, the render error appears:
The bottom left nextjs icon(devIndicators) is showing rendering

this is the console output when clicked the logout button:
```
 POST /editor 200 in 34ms (next.js: 4ms, proxy.ts: 7ms, application-code: 23ms)
  └─ ƒ invalidateCacheAction() in 1ms node_modules/@clerk/nextjs/dist/esm/app-router/server-actions.js
 GET / 200 in 26ms (next.js: 5ms, proxy.ts: 8ms, application-code: 13ms)
 GET /sign-in 200 in 28ms (next.js: 5ms, proxy.ts: 4ms, application-code: 18ms)
 GET /sign-in 200 in 19ms (next.js: 4ms, proxy.ts: 4ms, application-code: 11ms)
 ```