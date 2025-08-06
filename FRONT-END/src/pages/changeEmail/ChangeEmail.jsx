import OutlinedInput from "@mui/material/OutlinedInput";
import "./changeEmail.css";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import StepLabel from "@mui/material/StepLabel";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import Box from "@mui/material/Box";
import UpdateEmailForm from "./components/UpdateEmailForm";
import { useState } from "react";
import VerifyEmailOTP from "./components/VerifyEmailOTP";

const ChangeEmail = () => {
  const steps = [
    "Enter Your New Email and Current Password",
    "Create an ad group",
    "Create an ad",
  ];

  const [step , setStep] = useState(1)
const [email , setEmail] = useState("")

const nextStep = () => setStep(prev => prev + 1)
const prevStep = () => setStep(prev => prev - 1)

  return (
    <section className="sectionEmailChange">
      <div className="container">
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={step} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {step === 0 && (
          <UpdateEmailForm email={email} setEmail={setEmail} nextStep={nextStep} />
        )}
        {step === 1 && (
          <VerifyEmailOTP/>
        )}
      </div>
    </section>
  );
};

export default ChangeEmail;
