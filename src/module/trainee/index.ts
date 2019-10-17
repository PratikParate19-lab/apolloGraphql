import { mergeTypes } from 'merge-graphql-schemas';
import fs from 'fs';

const traineetypesArray = [
  fs.readFileSync('src/module/trainee/type.graphql', 'utf-8')
];
const traineeQuery = mergeTypes(traineetypesArray, { all: true });

export default traineeQuery;
