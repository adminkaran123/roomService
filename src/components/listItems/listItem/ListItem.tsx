import { OptionItem } from '../../../utils/types/ListItems';
import { ItemButton, ItemContent, RowIcon } from './ListItem.styles';

type Props = {
  item: OptionItem;
  onClickAction?: Function;
  disableGutters?: boolean;
};

function ListItem(props: Props) {
  const { item, onClickAction, disableGutters } = props;

  const handleOnClick = () => {
    if (onClickAction) onClickAction();
    item.onClickAction();
  };
  return (
    <ItemContent disableGutters={disableGutters}>
      <ItemButton data-id={item.optionName} onClick={handleOnClick}>
        <RowIcon src={item.icon} alt={item.optionName} />
        {item.optionName}
      </ItemButton>
    </ItemContent>
  );
}

export default ListItem;
