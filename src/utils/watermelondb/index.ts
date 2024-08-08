import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './schema';
import migrations from './migrations';
import {History, Task} from './models';

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: 'todo_app',
  jsi: true,
  onSetUpError: error => {
    console.log(`ThongDN - watermelondb -> onSetUpError:  ${error}`);
  },
});

const database = new Database({
  adapter,
  modelClasses: [Task, History],
});

export default database;
