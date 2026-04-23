import React, { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import emailjs from "@emailjs/browser";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Bio } from "../../data/constants";

// ── Animations ────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`to { transform: rotate(360deg); }`;

const popIn = keyframes`
  0%   { transform: scale(0.85); opacity: 0; }
  100% { transform: scale(1);    opacity: 1; }
`;

// ── Layout ────────────────────────────────────────────────────────────────────

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  position: relative;
  z-index: 1;
`;

const Title = styled.h2`
  font-size: 52px;
  font-weight: 700;
  text-align: center;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, #c471ed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;

  @media (max-width: 768px) { font-size: 32px; }
`;

const Subtitle = styled.p`
  font-size: 17px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  margin-bottom: 52px;
  max-width: 520px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  background: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 48px rgba(133, 76, 230, 0.12);
  animation: ${fadeUp} 0.6s ease both;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// ── Left info panel ───────────────────────────────────────────────────────────

const InfoPanel = styled.div`
  padding: 24px 36px;
  background: linear-gradient(
    160deg,
    rgba(133, 76, 230, 0.18) 0%,
    rgba(0, 112, 243, 0.1) 100%
  );
  display: flex;
  flex-direction: column;
  gap: 32px;
  border-right: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding: 36px 28px;
  }
`;

const InfoHeading = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 25px;
`;

const InfoText = styled.p`
  font-size: 14px;
  line-height: 1.8;
  color: ${({ theme }) => theme.text_secondary};
  margin: -20px 0 0;
`;

const InfoItem = styled.a`
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  font-weight: 500;
  transition: all 0.25s ease;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid transparent;

  &:hover {
    color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary}33;
    background: ${({ theme }) => theme.primary}0f;
    transform: translateX(4px);
  }

  svg {
    font-size: 20px;
    color: ${({ theme }) => theme.primary};
    flex-shrink: 0;
  }
`;

const ResponseBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
`;

const GreenDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 6px #22c55e;
  flex-shrink: 0;
`;

// ── Right form panel ──────────────────────────────────────────────────────────

const FormPanel = styled.form`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

const FormHeading = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0 0 4px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const inputStyles = `
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  outline: none;
  font-size: 15px;
  font-family: inherit;
  color: #fff;
  border-radius: 10px;
  padding: 12px 16px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;

  &::placeholder { color: rgba(255, 255, 255, 0.2); }

  &:focus {
    border-color: #854ce6;
    box-shadow: 0 0 0 3px rgba(133, 76, 230, 0.15);
  }
`;

const Input = styled.input`${inputStyles}`;

const Textarea = styled.textarea`
  ${inputStyles}
  resize: vertical;
  min-height: 110px;
`;

const SubmitBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #854ce6, #c471ed);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 4px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(133, 76, 230, 0.45);
  }

  &:disabled { opacity: 0.7; cursor: not-allowed; }
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

const StatusMsg = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 16px;
  border-radius: 10px;
  animation: ${popIn} 0.35s ease both;
  background: ${({ success }) =>
    success ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)"};
  border: 1px solid ${({ success }) =>
    success ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)"};
  color: ${({ success }) => (success ? "#22c55e" : "#ef4444")};

  svg { font-size: 18px; }
`;

// ── Component ─────────────────────────────────────────────────────────────────

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus("success");
        form.current.reset();
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setStatus("error");
      });
  };

  return (
    <Section id="Contact">
      <Title>Get In Touch</Title>
      <Subtitle>
        Have a project in mind or just want to say hi? My inbox is always open!
      </Subtitle>

      <Card>
        {/* ── LEFT PANEL ── */}
        <InfoPanel>
          <div>
            <InfoHeading>Let's work together</InfoHeading>
            <InfoText>
              I'm currently open to new opportunities. Whether it's a full-time
              role, freelance project, or just a chat-feel free to reach out!
            </InfoText>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <InfoItem href="mailto:lakshanravi@gmail.com">
              <EmailIcon />
              lakshanravindu375@gmail.com
            </InfoItem>
            <InfoItem href={Bio.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
              linkedin.com/in/lakshancodes
            </InfoItem>
            <InfoItem href={Bio.github} target="_blank" rel="noopener noreferrer">
              <GitHubIcon />
              github.com/lakshanravi
            </InfoItem>
          </div>

          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.5px", marginBottom: 10, textTransform: "uppercase" }}>
              Response time
            </div>
            <ResponseBadge>
              <GreenDot />
              Usually within 24 hours
            </ResponseBadge>
          </div>
        </InfoPanel>

        {/* ── RIGHT PANEL ── */}
        <FormPanel ref={form} onSubmit={handleSubmit}>
          <FormHeading>Send a message ✉️</FormHeading>

          <Row>
            <FieldWrap>
              <Label>Your Name</Label>
              <Input type="text" name="from_name" placeholder="Ravindu" required />
            </FieldWrap>
            <FieldWrap>
              <Label>Your Email</Label>
              <Input type="email" name="from_email" placeholder="you@example.com" required />
            </FieldWrap>
          </Row>

          <FieldWrap>
            <Label>Subject</Label>
            <Input type="text" name="subject" placeholder="Project inquiry / Job opportunity..." required />
          </FieldWrap>

          <FieldWrap>
            <Label>Message</Label>
            <Textarea name="message" placeholder="Hi Ravindu, I'd love to discuss..." rows={5} required />
          </FieldWrap>

          {status === "success" && (
            <StatusMsg success>
              <CheckCircleOutlineIcon />
              Message sent! I'll get back to you soon.
            </StatusMsg>
          )}
          {status === "error" && (
            <StatusMsg>
              <ErrorOutlineIcon />
              Something went wrong. Please try again or email me directly.
            </StatusMsg>
          )}

          <SubmitBtn type="submit" disabled={status === "loading"}>
            {status === "loading" ? (
              <><Spinner /> Sending...</>
            ) : (
              <><SendIcon style={{ fontSize: 18 }} /> Send Message</>
            )}
          </SubmitBtn>
        </FormPanel>
      </Card>
    </Section>
  );
};

export default Contact;