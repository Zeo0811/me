# IP country and timezone data

This product includes GeoLite2 Data created by MaxMind, available from https://www.maxmind.com/.

Country and IANA timezone fields are extracted from GeoLite2 City by ip-location-api 5.0.2. Its redist channel downloads the source via https://github.com/sapics/node-geolite2-redist. Visitor IP addresses are looked up locally and are not sent to MaxMind or the redistribution service.

Current terms: https://www.maxmind.com/en/geolite/eula (checked 2026-09-16, page updated 2026-02-12).
CC BY-SA 4.0: https://creativecommons.org/licenses/by-sa/4.0/.
Retain attribution. Refresh/rebuild the database at least monthly and restart the process; do not keep using superseded datasets beyond the time permitted by the terms. A copy of the current terms is stored as `GeoLite-EULA.html`. The library also retains its own license notices.

The previous country-only `user-country` dataset used CDLA-Permissive-2.0; its historical license file is retained, but the runtime now uses country+timezone GeoLite2 data.
