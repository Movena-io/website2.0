#!/usr/bin/env bash
# Regenerates every page component from the design export.
# Run from the repo root: bash scripts/build-pages.sh
set -euo pipefail
cd "$(dirname "$0")/.."

gen() { # <file> <Component> <locale> [needleOverride]
  local file="$1" comp="$2" loc="$3"
  local needle="Se Movena med"
  [ "$loc" = "en" ] && needle="See Movena with"
  [ "${4:-}" = "-" ] && needle="-"
  node scripts/dc-to-tsx.mjs "design-export/$file" "components/generated/$comp.tsx" "$comp" "$needle" "$loc"
}

# --- Danish ---------------------------------------------------------------
gen Forside-v6.dc.html                ForsideDa               da
gen Vind-flere-flytninger-v5.dc.html  VindFlereFlytningerDa   da
gen Hav-styr-paa-dagen-v5.dc.html     HavStyrPaaDagenDa       da
gen Faa-alle-pengene-hjem-v5.dc.html  FaaAllePengeneHjemDa    da
gen Om-os-v5.dc.html                  OmOsDa                  da
gen Book-demo-v5.dc.html              BookDemoDa              da -   # page owns its hero
gen Blog-v5.dc.html                   BlogIndexDa             da
gen Blog-post-v5.dc.html              BlogPostDa              da
gen Privatlivspolitik-v5.dc.html      PrivatlivspolitikDa     da
gen 404-v5.dc.html                    NotFoundDa              da
gen Fejl-v5.dc.html                   ErrorDa                 da

# --- English --------------------------------------------------------------
gen EN-Home.dc.html            ForsideEn             en
gen EN-Win-more-moves.dc.html  VindFlereFlytningerEn en
gen EN-Run-the-day.dc.html     HavStyrPaaDagenEn     en
gen EN-Get-paid.dc.html        FaaAllePengeneHjemEn  en
gen EN-About.dc.html           OmOsEn                en
gen EN-Book-demo.dc.html       BookDemoEn            en -
gen EN-Blog.dc.html            BlogIndexEn           en
gen EN-Blog-post.dc.html       BlogPostEn            en
gen EN-Privacy.dc.html         PrivatlivspolitikEn   en
gen EN-404.dc.html             NotFoundEn            en
gen EN-Error.dc.html           ErrorEn               en

# --- Guard -----------------------------------------------------------------
# The call-slot fields and the failure state are grafted onto the design by
# string replacement in dc-to-tsx.mjs. If a re-export ever changes the markup
# those replacements match, they stop applying silently and the booking form
# quietly loses its required fields. Fail loudly instead.
check() { # <file> <needle> <what>
  grep -q -- "$2" "$1" || { echo "FAIL: $3 missing from $1" >&2; exit 1; }
}
for f in components/generated/BookDemoDa.tsx components/generated/BookDemoEn.tsx; do
  check "$f" 'id="d-dag"'  "call-day select"
  check "$f" 'id="d-tid"'  "call-time select"
  check "$f" 'dDayOpts'    "call-slot options"
  check "$f" 'V.dFailed'   "send-failure message"
  check "$f" 'callDay:'    "callDay in the submit payload"
  grep -q -- 'd-naar' "$f" && { echo "FAIL: old when-suits-you select still in $f" >&2; exit 1; }
done

echo "done"
