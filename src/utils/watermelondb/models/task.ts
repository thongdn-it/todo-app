import dayjs from 'dayjs';
import {
  Database,
  Model,
  TableSchema,
  tableSchema,
  Q,
  Query,
} from '@nozbe/watermelondb';
import {field, date, readonly, children} from '@nozbe/watermelondb/decorators';

import {History} from './history';

export class Task extends Model {
  static table = 'tasks';

  static get schema(): TableSchema {
    return tableSchema({
      name: Task.table,
      columns: [
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string', isOptional: true},
        {name: 'frequency_type_id', type: 'number'},
        {name: 'times_of_day', type: 'string', isOptional: true},
        {name: 'days_of_the_week', type: 'string', isOptional: true},
        {name: 'days_of_the_month', type: 'string', isOptional: true},
        {name: 'start_day', type: 'number'},
        {name: 'end_day', type: 'number', isOptional: true},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
      ],
    });
  }

  @field('name') name!: string;
  @field('description') description: string | undefined;
  @field('frequency_type_id') frequencyTypeId!: number;
  @field('times_of_day') timesOfDay: string | undefined;
  @field('days_of_the_week') daysOfTheWeek: string | undefined;
  @field('days_of_the_month') daysOfTheMonth: string | undefined;
  @date('start_day') startDay!: Date;
  @date('end_day') endDay: Date | undefined;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  static async create(db: Database, recordBuilder: (record: Task) => void) {
    return db.write(() => {
      return db.get<Task>(Task.table).create(recordBuilder);
    });
  }

  static async get(
    db: Database,
    filter: {id?: string; date?: Date | number | undefined},
  ) {
    if (filter.id !== undefined) {
      const _result = await db.get<Task>(Task.table).find(filter.id);
      if (_result !== undefined) {
        return [_result];
      }
    } else {
      var query: Q.Clause[] = [Q.sortBy('updated_at', Q.desc)];
      if (filter.date !== undefined) {
        const _date = dayjs(filter.date).valueOf();
        console.log(`ThongDN - get task - _date: ${_date}`);
        // query.push(
        //   Q.where('start_day', Q.lte(_date)),
        //   Q.and(
        //     Q.or(
        //       Q.where('end_day', Q.eq(null)),
        //       Q.where('end_day', Q.gte(_date)),
        //     ),
        //   ),
        // );
      }
      const _result = db.get<Task>(Task.table).query(query);
      return _result.fetch();
    }
  }
}
