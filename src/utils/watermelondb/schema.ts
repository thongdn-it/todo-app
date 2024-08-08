import {appSchema} from '@nozbe/watermelondb';

import {Task, History} from './models';

export default appSchema({
  version: 1,
  tables: [Task.schema, History.schema],
});
