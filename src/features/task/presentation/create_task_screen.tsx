import React, {useState} from 'react';

import dayjs from 'dayjs';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Button, FormControl, Input, Select, Text, View} from 'native-base';

import {tdTheme} from '../../../constants/themes';
import {TDCreateTaskScreenProps} from '../../../routes/props';
import {useTaskStore} from '../../home/presentation/home_state';

export const TDCreateTaskScreen = ({navigation}: TDCreateTaskScreenProps) => {
  const [name, setName] = useState('');
  const [frequencyTypeId, setFrequencyTypeId] = useState<string | undefined>();
  const [isShowStartDayPicker, setIsShowStartDayPicker] = useState(false);
  const [startDay, setStartDay] = useState(new Date());
  const [isShowEndDayPicker, setIsShowEndDayPicker] = useState(false);
  const [endDay, setEndDay] = useState<Date | undefined>();
  const {create} = useTaskStore();

  const _onCreate = () => {
    create({
      name: name,
      frequencyTypeId:
        frequencyTypeId !== undefined ? parseInt(frequencyTypeId, 10) : 0,
      startDay: startDay,
      endDay: endDay,
    });
    navigation.goBack();
  };

  return (
    <View p="4">
      <FormControl>
        <FormControl.Label isRequired> Name</FormControl.Label>
        <Input value={name} onChangeText={v => setName(v)} />
      </FormControl>
      <FormControl mt="4">
        <FormControl.Label isRequired>Frequency</FormControl.Label>
        <Select
          selectedValue={frequencyTypeId}
          placeholder="How often do you want to do it?"
          _selectedItem={{textDecorationColor: tdTheme.colors.black}}
          onValueChange={v => setFrequencyTypeId(v)}>
          <Select.Item value="0" label="Every day" />
          <Select.Item
            value="1"
            label="Specific days of the week"
            disabled={true}
          />
          <Select.Item
            value="2"
            label="Specific days of the month"
            disabled={true}
          />
          <Select.Item
            value="3"
            label="Specific days of the year"
            disabled={true}
          />
        </Select>
      </FormControl>

      <FormControl mt="4">
        <FormControl.Label>Start Day</FormControl.Label>
        <Button
          variant="outline"
          onPress={() => setIsShowStartDayPicker(!isShowStartDayPicker)}>
          <Text>{dayjs(startDay).format('DD/MM/YYYY')}</Text>
        </Button>
        {isShowStartDayPicker && (
          <DateTimePicker
            value={startDay}
            minimumDate={new Date()}
            onChange={(_, v) => {
              setIsShowStartDayPicker(false);
              if (v) {
                setStartDay(v);
              }
            }}
          />
        )}
      </FormControl>

      <FormControl mt="4">
        <FormControl.Label>End Day</FormControl.Label>
        <Button
          variant="outline"
          onPress={() => setIsShowEndDayPicker(!isShowEndDayPicker)}>
          <Text>{endDay ? dayjs(endDay).format('DD/MM/YYYY') : ''}</Text>
        </Button>
        {isShowEndDayPicker && (
          <DateTimePicker
            value={startDay}
            minimumDate={new Date()}
            onChange={(_, v) => {
              setIsShowEndDayPicker(false);
              setEndDay(v);
            }}
          />
        )}
      </FormControl>

      <FormControl mt="8">
        <Button
          isDisabled={name.length === 0 || frequencyTypeId === undefined}
          onPress={_onCreate}>
          Create
        </Button>
      </FormControl>
    </View>
  );
};
