import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import { PaystackButton } from "react-paystack";
let token = "";
let publicKey = "pk_test_7546b591c13199a3f624c0d46017a9c5cad9a1a6";
export default function Addmoney() {
  const [amount, setAmount] = useState("");
  const [amount1, setAmount1] = useState("");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [Token, setToken] = React.useState("");

  const [id, setid] = React.useState("");

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      // phone,
    },
    publicKey,
    text: "Add money",
    onSuccess: () => {
        setAmount1("")

    },
    onClose: () => alert("Are you sure you want to cancel this transaction,"),
  };

  useEffect(() => {
    setToken(localStorage.getItem("Token"));
    setid(localStorage.getItem("id"));
    setEmail(localStorage.getItem("email"));
    setName(localStorage.getItem("name"));
  });

  return (
    <div>
      <Box m={2} p={2}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={12} md={6} lg={6}>
            <Card style={{ padding: 100 }} raised={true}>
              <Grid
                container
                justify="flex-start"
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={12} justify="center">
                  <Grid container direction="row" justify="center">
                    <Typography
                      variant="h6"
                      gutterBottom
                      style={{ fontWeight: "bold" }}
                      color="primary"
                    >
                      Add money to your wallet
                    </Typography>
                  </Grid>
                </Grid>
                <Grid xs={12}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={8}>
                      <TextField
                        variant="outlined"
                        required
                        margin="dense"
                        label="amount"
                        value={amount}
                        type="amount"
                        id="password"
                        autoComplete="current-password"
                        fullWidth
                        size="small"
                        helperText={"please enter your amount"}
                        onChange={(event) =>{
                          setAmount(event.target.value)
                        //   setAmount1(event.target.value*100)
                        }
                        }
                      ></TextField>
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        variant="outlined"
                        required
                        margin="dense"
                        label="email"
                        value={email}
                        autoComplete="current-password"
                        fullWidth
                        size="small"
                        helperText={"please enter your email"}
                        onChange={(event) =>
                          setEmail(event.target.value)
                        }
                      ></TextField>
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        variant="outlined"
                        required
                        margin="dense"
                        label="Name"
                        value={name}
                        id="name"
                        autoComplete="current-password"
                        fullWidth
                        size="small"
                        helperText={"please enter your name"}
                        onChange={(event) =>
                          setName(event.target.value)
                        }
                      ></TextField>
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        variant="outlined"
                        required
                        margin="dense"
                        label="phone number"
                        value={phone}
                        id="phone"
                        fullWidth
                        size="small"
                        helperText={"please enter your phone number"}
                        onChange={(event) =>
                          setPhone(event.target.value)
                        }
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={12}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <PaystackButton
                      className="paystack-button"
                      {...componentProps}
                      onSuccess={(e) => console.log(e)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
