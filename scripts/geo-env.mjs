import { resolve } from 'node:path';
// Local country + IANA timezone lookup. No visitor IPs leave this server.
process.env.ILA_IP_LOCATION_DB = '';
process.env.ILA_FIELDS = 'country,timezone';
process.env.ILA_LICENSE_KEY = 'redist';
// Request handling only reads the prepared database, never downloads it.
process.env.ILA_SKIP_INITIAL_RELOAD = 'true';
process.env.ILA_DATA_DIR = resolve('.geoip/data');
process.env.ILA_TMP_DATA_DIR = resolve('.geoip/tmp');
process.env.ILA_AUTO_UPDATE = 'false';
process.env.ILA_SILENT = 'true';
