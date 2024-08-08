import React from 'react';

import {
  CheckCircleIcon,
  CircleIcon,
  Column,
  Pressable,
  Text,
} from 'native-base';

import {Task} from '../../../utils/watermelondb/models';
import {tdTheme} from '../../../constants/themes';

interface TDTaskItemProps {
  task: Task;
  onTask: (task: Task) => void;
}
export const TDTaskItem = (props: TDTaskItemProps) => {
  return (
    <Pressable
      p="4"
      flexDir="row"
      alignContent="center"
      onPress={() => props.onTask(props.task)}>
      <Column flex={1}>
        <Text bold numberOfLines={1}>
          {props.task.name}
        </Text>
        <Text numberOfLines={2}>{props.task.startDay.valueOf()}</Text>
      </Column>
      {/* <CircleIcon /> */}
      <CheckCircleIcon color={tdTheme.colors.secondary[600]} />
    </Pressable>
  );
};
