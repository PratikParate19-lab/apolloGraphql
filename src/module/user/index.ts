import { mergeTypes } from 'merge-graphql-schemas';
import fs from 'fs';

const usertypesArray = [
  fs.readFileSync('src/module/user/type.graphql', 'utf-8')
];
const userQuery = mergeTypes(usertypesArray, { all: true });

export default userQuery;
