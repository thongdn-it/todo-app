import {extendTheme} from 'native-base';

import {tdColors} from './colors';

export const tdTheme = extendTheme({
  colors: {
    dolphin: tdColors.dolphin,
    feedback: tdColors.feedback,
    survey: tdColors.survey,
    primary: tdColors.feedback,
    secondary: tdColors.dolphin,
  },
  config: {
    initialColorMode: 'dark',
  },
});
