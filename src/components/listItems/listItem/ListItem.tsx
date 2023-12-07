import { ItemButton, ItemContent, RowIcon } from "./ListItem.styles";

type Props = {
  item: any;
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
      <ItemButton data-id={item?.optionName} onClick={handleOnClick}>
        {item?.icon && <RowIcon src={item?.icon} alt={item?.optionName} />}
        {item?.optionName}
      </ItemButton>
    </ItemContent>
  );
}

export default ListItem;
