import {create} from 'zustand';

import database from '../../../utils/watermelondb';
import {History, Task} from '../../../utils/watermelondb/models';

interface TaskState {
  tasks: Task[];
  create: (data: {
    name: string;
    frequencyTypeId: number;
    startDay: Date;
    endDay?: Date;
  }) => Promise<void>;
  fetch: (date: Date | number | undefined) => Promise<void>;
  createHistory: (data: {
    task: Task;
    dateTime: Date;
    isDone: boolean;
  }) => Promise<void>;
}

export const useTaskStore = create<TaskState>(set => ({
  tasks: [],

  create: async (data: {
    name: string;
    frequencyTypeId: number;
    startDay: Date;
    endDay?: Date;
  }) => {
    const _result = await Task.create(database, t => {
      t.name = data.name;
      t.frequencyTypeId = data.frequencyTypeId;
      t.startDay = data.startDay;
      t.endDay = data.endDay;
    });
    console.log(`ThongDN - createTask: ${_result.id}`);
    set(state => ({tasks: [_result, ...state.tasks]}));
  },

  fetch: async (date: Date | number | undefined) => {
    const _result = await Task.get(database, {date: date});
    console.log(`ThongDN - fetch: ${_result?.length}`);
    set(_ => ({tasks: _result ?? []}));
  },

  createHistory: async (data: {
    task: Task;
    dateTime: Date;
    isDone: boolean;
  }) => {
    const _result = await History.create(database, h => {
      h.task = data.task;
      h.isDone = data.isDone;
      h.dateTime = data.dateTime;
    });
    console.log(`ThongDN - createHistory: ${_result.id}`);
  },
}));
