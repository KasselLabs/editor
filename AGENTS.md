# Repository instructions

## Node runtime security

CI uses Node.js 22.23.4 to address CVE-2026-111497. Use at least this patch
within Node 22 for local builds. Keep exact CI pins aligned and rebuild affected
artifacts after runtime updates.
