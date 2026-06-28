Ren favicon package — for renishere.com (repo: lightalchemylabs/ren)
====================================================================
The lotus on a dark "sanctuary" rounded square, sized for browser tabs,
Google search results, and bookmarks across desktop + mobile.

1) Put ALL of these files in the REPO ROOT (same folder as index.html):
     favicon.ico            (16/32/48 — tabs, Google, legacy)
     favicon.svg            (crisp, modern browsers)
     favicon-16x16.png
     favicon-32x32.png
     favicon-48x48.png
     favicon-96x96.png
     apple-touch-icon.png   (180 — iOS home screen / bookmarks)
     icon-192.png           (Android / PWA, via manifest)
     icon-512.png           (Android / PWA, via manifest)
     site.webmanifest

2) Add this inside the <head> of index.html:

     <link rel="icon" href="/favicon.ico" sizes="any">
     <link rel="icon" type="image/svg+xml" href="/favicon.svg">
     <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
     <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
     <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
     <link rel="manifest" href="/site.webmanifest">

3) Commit + push -> Vercel deploys.

Notes:
- If index.html already has a <link rel="icon"> or <link rel="shortcut icon">,
  remove it so these take precedence.
- Tabs/bookmarks update immediately (hard-refresh / clear cached favicon if needed).
- The Google search-results favicon only updates after Google re-crawls the site
  (days to ~2 weeks). Nothing else to do on your end.
