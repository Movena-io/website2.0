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

echo "done"
