import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, Stack, TextField, makeStyles } from "@mui/material";

// const styles. = makeStyles((theme) => ({
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     maxWidth: "300px",
//     margin: "auto",
//     padding: theme.spacing(2),
//   },
//   input: {
//     marginBottom: theme.spacing(2),
//   },
// }));

const CardForm: React.FC = ({ variant }: any) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement)!,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("Payment Method created:", paymentMethod);
      // Handle the payment method, e.g., send it to your server for further processing
    }
  };

  return (
    <form className="stripe_form" onSubmit={handleSubmit}>
      <TextField
        label="Card Number"
        variant={variant}
        InputLabelProps={{ shrink: true }}
        className="input"
        InputProps={{
          //@ts-ignore
          inputComponent: CardNumberElement,
        }}
      />
      <Stack direction="row" spacing={2}>
        <TextField
          label="Expiration Date"
          variant={variant}
          InputLabelProps={{ shrink: true }}
          className="input"
          InputProps={{
            //@ts-ignore
            inputComponent: CardExpiryElement,
          }}
        />

        <TextField
          label="CVC"
          variant={variant}
          InputLabelProps={{ shrink: true }}
          className="input"
          InputProps={{
            //@ts-ignore
            inputComponent: CardCvcElement,
          }}
          style={{ width: 200 }}
        />
      </Stack>

      <Button type="submit" variant="contained" color="primary">
        Pay
      </Button>
    </form>
  );
};

export default CardForm;
