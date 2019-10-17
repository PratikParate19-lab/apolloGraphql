import traineeQuery from './module/trainee/index';
import userQuery from './module/user/index';
import { mergeTypes } from 'merge-graphql-schemas';
const queryType = mergeTypes([traineeQuery, userQuery], { all: true });
export default queryType;
