import { Stack, StackProps, Typography } from '@mui/material';

import Illustration1 from '../../../assets/images/illustration1.svg';
import {
  ActionButton,
  ImageBox,
  InfoPanel,
  MainStack,
} from './ListItemInfo.styles';

interface Props extends StackProps {
  id: string;
  title: string;
  description: string;
  onAction: Function;
  actionItemButtonTitle?: string;
  footerText?: string;
  imageUrl?: string;
}

const ListItemInformation = (props: Props) => {
  const {
    id,
    title,
    description,
    actionItemButtonTitle,
    onAction,
    footerText,
    imageUrl,
    ...other
  } = props;

  return (
    <MainStack direction={'row'} {...other}>
      <InfoPanel>
        <Stack spacing={2}>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="body2">{description}</Typography>
          {actionItemButtonTitle && (
            <ActionButton
              variant="contained"
              size="large"
              onClick={() => onAction(id)}
            >
              {actionItemButtonTitle}
            </ActionButton>
          )}
          {footerText && <Typography variant="body2">{footerText}</Typography>}
        </Stack>
      </InfoPanel>
      <ImageBox>
        <img
          src={imageUrl || Illustration1}
          alt={`${title} representation`}
          onError={(event) => (event.currentTarget.src = Illustration1)}
        />
      </ImageBox>
    </MainStack>
  );
};

export default ListItemInformation;
