



import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';


// until https://github.com/angular-schule/angular-cli-ghpages/pull/166 is merged and released
// we manually apply the patch
const pathToFile = join( __dirname, '..', 'node_modules/angular-cli-ghpages/deploy/schema.json');
const schemaJson = readFileSync(pathToFile, 'utf8');
const patchedSchemaJson = schemaJson
    .replace(
`    "cname": {
      "type": "string",
      "description": "Generate a CNAME file for the specified domain.",
      "default": false
    },`, 
`    "cname": {
      "type": "string",
      "description": "Generate a CNAME file for the specified domain.",
      "default": ""
    },`);

writeFileSync(pathToFile, patchedSchemaJson);
