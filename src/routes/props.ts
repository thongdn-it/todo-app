import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type TDParamList = {
  Home: undefined;
  CreateTask: undefined;
};

type TDAppStackScreenProps<T extends keyof TDParamList> =
  NativeStackScreenProps<TDParamList, T>;

export type TDHomeScreenProps = TDAppStackScreenProps<'Home'>;
export type TDCreateTaskScreenProps = TDAppStackScreenProps<'CreateTask'>;
