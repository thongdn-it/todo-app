import {date, field, readonly} from '@nozbe/watermelondb/decorators';
import {
  Database,
  Model,
  Q,
  TableSchema,
  tableSchema,
} from '@nozbe/watermelondb';
import dayjs from 'dayjs';

export class History extends Model {
  static table = 'histories';

  static get schema(): TableSchema {
    return tableSchema({
      name: 'histories',
      columns: [
        {name: 'task_id', type: 'string'},
        {name: 'date_time', type: 'number'},
        {name: 'is_done', type: 'boolean'},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    });
  }

  @date('date_time') dateTime!: Date;
  @field('is_done') isDone: boolean | undefined;
  @readonly @date('created_at') createdAt: Date | undefined;
  @readonly @date('updated_at') updatedAt: Date | undefined;

  static async create(db: Database, recordBuilder: (record: History) => void) {
    return db.write(() => {
      return db.get<History>(History.table).create(recordBuilder);
    });
  }

  async getLastHistory(
    db: Database,
    filter: {taskId: String; day: Date | number | undefined},
  ) {
    const _day = dayjs(filter.day);
    const _startOfDay = dayjs(_day.format('YYYY-MM-DD 00:00')).valueOf();
    const _endOfDay = dayjs(_day.format('YYYY-MM-DD 23:59')).valueOf();
    var query: Q.Clause[] = [
      Q.sortBy('updated_at', Q.desc),
      Q.take(1),
      Q.where('date_time', Q.between(_startOfDay, _endOfDay)),
    ];
    const _result = db.get<History>(History.table).query(query);
    return _result.fetch();
  }
}
