import { OutlinedTextFieldProps } from "@mui/material";
import debounce from "lodash.debounce";
import { memo, useEffect, useMemo } from "react";

import { SEARCH_ICON } from "../../../utils/constants/svgContstants";
import { SearchBox, SearchIcon, SearchInput } from "./SearchTextfield.styles";

const SEARCH_MILISECONDS_WAIT_TIME = 350;
interface Props extends Omit<OutlinedTextFieldProps, "variant"> {
  onSearch?: Function;
}

function SearchTextfield(props: Props) {
  const { onSearch, ...other } = props;

  const changeHandler = (event: any) => {
    if (onSearch) onSearch(event.target.value);
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, SEARCH_MILISECONDS_WAIT_TIME),
    []
  );

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  return (
    <SearchBox>
      <SearchIcon icon={SEARCH_ICON} />
      <SearchInput
        {...other}
        inputProps={{ "data-id": "search-textfield" }}
        onChange={debouncedChangeHandler}
      />
    </SearchBox>
  );
}

export default memo(SearchTextfield);
