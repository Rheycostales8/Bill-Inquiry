import * as React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import customTheme from "./theme";
import GoogleIcon from "./GoogleIcon";
import Table from "@mui/joy/Table";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function ColorSchemeToggle({ onClick, ...props }: IconButtonProps) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="plain" color="neutral" disabled />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="plain"
      color="neutral"
      {...props}
      onClick={(event) => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
        onClick?.(event);
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

/**
 * This template uses [`Inter`](https://fonts.google.com/specimen/Inter?query=inter) font.
 */
export default function JoySignInSideTemplate() {
  return (
    <CssVarsProvider
      defaultMode="dark"
      disableTransitionOnChange
      theme={customTheme}
    >
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
            "--Cover-width": "40vw", // must be `vw` only
            "--Form-maxWidth": "700px",
            "--Transition-duration": "0.4s" // set to `none` to disable transition
          }
        }}
      />
      <Box
        sx={(theme) => ({
          width: "100%",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(255 255 255 / 0.6)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)"
          }
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
            px: 2
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Typography
              fontWeight="lg"
              startDecorator={
                <Box
                  component="img"
                  src="https://billing.castillejoswaterdistrict.com/logo.ico"
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%"
                    //boxShadow: (theme) => theme.shadow.md,
                    //// "--joy-shadowChannel": (theme) =>
                    //  theme.vars.palette.primary.mainChannel
                  }}
                />
              }
            >
              Castillejos Water District
            </Typography>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 600,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden"
              }
            }}
          >
            <div>
              <Typography component="h2" fontSize="xl2" fontWeight="lg">
                Bill Inquiry
              </Typography>
              <Typography level="body2" sx={{ my: 1, mb: 3 }}>
                Let&apos;s get started! Please enter your details.
              </Typography>
            </div>
            <form
              onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                event.preventDefault();
                const formElements = event.currentTarget.elements;
                const data = {
                  email: formElements.email.value,
                  password: formElements.password.value,
                  persistent: formElements.persistent.checked
                };
                alert(JSON.stringify(data, null, 2));
              }}
            >
              <FormControl required>
                <FormLabel>Account Number</FormLabel>
                <Input
                  placeholder="Enter your account number"
                  type="text"
                  name="email"
                />
              </FormControl>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Checkbox
                  size="sm"
                  label="Agree to Terms & Conditions"
                  name="persistent"
                />
              </Box>
              <Button type="submit" fullWidth>
                Go
              </Button>
            </form>
            <div>
              <Typography level="body2" sx={{ my: 1, mb: 3 }}>
                Here is your water bill/s details.
              </Typography>
              <Table aria-label="basic table">
                <thead>
                  <tr>
                    <th style={{ width: "30%" }}>Bill Month</th>
                    <th style={{ width: "30%" }}>Due Date</th>
                    <th style={{ width: "30%" }}>Amount</th>
                    <th style={{ width: "30%" }}>Penalty</th>
                    <th style={{ width: "30%" }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>April 2023</td>
                    <td>04/11/2023</td>
                    <td>453.80</td>
                    <td>45.38</td>
                    <td>499.18</td>
                  </tr>
                  <tr>
                    <td>May 2023</td>
                    <td>05/10/2023</td>
                    <td>245.00</td>
                    <td>24.50</td>
                    <td>269.00</td>
                  </tr>

                  <tr style={{ fontWeight: "bold" }}>
                    <td colspan="4">Total</td>

                    <td>768.18</td>
                  </tr>
                </tbody>
              </Table>
              <Button type="submit" fullWidth>
                Pay
              </Button>
            </div>
          </Box>
          <Box>
            <Typography level="body3" textAlign="center">
              Powered by Xynapse Information Technology Services
            </Typography>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body3" textAlign="center">
              © Castillejos Water District {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
