#!/usr/bin/env bash
# Pixel-diffs every rebuilt page against its design export at 1440/820/390.
# Design must be served on :8001 and the site on :3000, with headless Chrome
# listening on :9333.
set -uo pipefail
cd "$(dirname "$0")/.."

D=http://localhost:8001
S=http://localhost:3000

run() { node scripts/pixel-diff.mjs "$D/$1" "$S$2" "$3" 2>&1 | grep -E '^\S+ @'; }

run Forside-v6.dc.html               /da                        forside-da
run Vind-flere-flytninger-v5.dc.html /da/vind-flere-flytninger  vind-da
run Hav-styr-paa-dagen-v5.dc.html    /da/hav-styr-paa-dagen     dagen-da
run Faa-alle-pengene-hjem-v5.dc.html /da/faa-alle-pengene-hjem  penge-da
run Om-os-v5.dc.html                 /da/om-os                  omos-da
run Book-demo-v5.dc.html             /da/book-demo              demo-da
run Privatlivspolitik-v5.dc.html     /da/privatlivspolitik      priv-da

run EN-Home.dc.html            /en                  forside-en
run EN-Win-more-moves.dc.html  /en/win-more-moves   vind-en
run EN-Run-the-day.dc.html     /en/run-the-day      dagen-en
run EN-Get-paid.dc.html        /en/get-paid         penge-en
run EN-About.dc.html           /en/about            omos-en
run EN-Book-demo.dc.html       /en/book-demo        demo-en
run EN-Privacy.dc.html         /en/privacy          priv-en
