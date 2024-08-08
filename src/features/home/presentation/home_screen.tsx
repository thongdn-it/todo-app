import React, {useCallback, useEffect, useState} from 'react';
import {ListRenderItemInfo, RefreshControl} from 'react-native';

import dayjs from 'dayjs';
import {Text, View, Fab, AddIcon, Card, FlatList, Divider} from 'native-base';

import {useTaskStore} from './home_state';
import {TDHomeScreenProps} from '../../../routes/props';
import {Task} from '../../../utils/watermelondb/models';
import {useIsFocused} from '@react-navigation/native';
import {TDTaskItem} from './task_item';

export const TDHomeScreen = ({navigation}: TDHomeScreenProps) => {
  const isFocused = useIsFocused();

  const {tasks, fetch, createHistory} = useTaskStore();
  const [date, setDate] = useState(dayjs().valueOf());
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetch(date);
  }, [date, fetch]);

  const _onAddTask = async () => {
    navigation.navigate('CreateTask');
  };

  const _onRefresh = async () => {
    setRefreshing(true);
    await fetch(date);
    setRefreshing(false);
  };

  const _onTask = (task: Task) => {
    createHistory({task, dateTime: new Date(), isDone: true});
  };

  const _renderUIItemTask = ({item}: ListRenderItemInfo<Task>) => {
    return <TDTaskItem task={item} onTask={_onTask} />;
  };

  const _renderSeparator = () => {
    return <Divider />;
  };

  const _renderUIListTask = () => {
    return (
      <FlatList
        data={tasks}
        renderItem={_renderUIItemTask}
        ItemSeparatorComponent={_renderSeparator}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
        }
      />
    );
  };

  return (
    <View>
      {isFocused && <Fab icon={<AddIcon />} onPress={_onAddTask} />}
      {_renderUIListTask()}
    </View>
  );
};
