import { TextFieldProps } from '@mui/material';
import { id } from 'date-fns/locale';
import { forwardRef } from 'react';

import IconMinus from '../../../assets/icons/icon_minus.svg';
import IconPlus from '../../../assets/icons/icon_plus_white.svg';
import { InputArea, StyledTextfield } from './NumberTextField.styles';

interface Props extends Omit<TextFieldProps, ''> {
  rowReverse?: boolean;
  handleChange?: Function;
  value: number;
}

// eslint-disable-next-line react/display-name
const NumberTextField = forwardRef((props: Props, ref) => {
  const { rowReverse, value, handleChange, ...other } = props;
  return (
    <InputArea>
      <button
        onClick={() => {
          if (handleChange && value > 1) handleChange(value - 1);
        }}
      >
        <img src={IconMinus} alt="Icon Minus" />
      </button>
      <StyledTextfield
        {...other}
        value={value}
        onChange={(e) => {
          if (handleChange) handleChange(e.target.value);
        }}
        /*
     // @ts-ignore */
        ref={ref!}
        rowreverse={(!!rowReverse)?.toString()}
      />
      <button
        onClick={() => {
          if (handleChange) handleChange(value + 1);
        }}
      >
        <img src={IconPlus} alt="IconPlus" />
      </button>
    </InputArea>
  );
});
export default NumberTextField;
