import React from "react";
import styled, { keyframes } from "styled-components";
import { Bio } from "../../data/constants";
import Typewriter from "typewriter-effect";
import HeroImg from "../../images/HeroImage-Photoroom.png";
import HeroBgAnimation from "../HeroBgAnimation";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import StarCanvas from "../canvas/Stars";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// ── Keyframe animations ──────────────────────────────────────────────────────

const floatY = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-14px); }
`;

const orbPulse = keyframes`
  0%, 100% { transform: scale(1);   opacity: 0.55; }
  50%       { transform: scale(1.1); opacity: 0.75; }
`;

const shimmerText = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const borderSpin = keyframes`
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// ── Layout ───────────────────────────────────────────────────────────────────

const HeroSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  padding: 30px 24px 60px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 80px 20px 50px;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
`;

/* Soft ambient glow blobs in background */
const GlowBlob = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  animation: ${orbPulse} 6s ease-in-out infinite;

  &.blob-left {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, #854ce640 0%, transparent 70%);
    top: -80px;
    left: -120px;
    animation-delay: 0s;
  }
  &.blob-right {
    width: 420px;
    height: 420px;
    background: radial-gradient(circle, #0070f340 0%, transparent 70%);
    bottom: -60px;
    right: -80px;
    animation-delay: 3s;
  }
`;

const InnerContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  width: 100%;
  max-width: 1160px;

  @media (max-width: 960px) {
    flex-direction: column-reverse;
    gap: 40px;
    text-align: center;
  }
`;

// ── Left side ────────────────────────────────────────────────────────────────

const LeftCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;

  @media (max-width: 960px) {
    align-items: center;
  }
`;

const AvailableBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #22c55e14;
  border: 1px solid #22c55e44;
  border-radius: 30px;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #22c55e;
  letter-spacing: 0.4px;
  margin-bottom: 22px;
  width: fit-content;
  animation: ${fadeSlideUp} 0.6s ease both;

  @media (max-width: 960px) {
    align-self: center;
  }
`;

const GreenDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 6px #22c55e;
  flex-shrink: 0;
`;

const Greeting = styled(motion.p)`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0 0 6px;
  animation: ${fadeSlideUp} 0.6s 0.1s ease both;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const Name = styled(motion.h1)`
  font-size: clamp(40px, 6vw, 68px);
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 18px;
  background: linear-gradient(
    270deg,
    #854ce6,
    #c471ed,
    #ffffff,
    #854ce6
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmerText} 6s ease infinite,
             ${fadeSlideUp} 0.6s 0.2s ease both;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const RoleRow = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: clamp(18px, 2.5vw, 26px);
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
  animation: ${fadeSlideUp} 0.6s 0.3s ease both;
  opacity: 0;
  animation-fill-mode: forwards;

  @media (max-width: 960px) {
    justify-content: center;
  }
`;

const RoleLabel = styled.span`
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 400;
`;

const TypewriterWrap = styled.span`
  color: ${({ theme }) => theme.primary};
  min-width: 220px;
  display: inline-block;
`;

const Divider = styled.div`
  width: 60px;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, ${({ theme }) => theme.primary}, #c471ed);
  margin: 0 0 20px;

  @media (max-width: 960px) {
    align-self: center;
  }
`;

const Description = styled(motion.p)`
  font-size: 16px;
  line-height: 1.8;
  color: ${({ theme }) => theme.text_secondary};
  max-width: 500px;
  margin: 0 0 36px;
  animation: ${fadeSlideUp} 0.6s 0.4s ease both;
  opacity: 0;
  animation-fill-mode: forwards;

  @media (max-width: 960px) {
    text-align: center;
    max-width: 560px;
  }
`;

const ButtonRow = styled(motion.div)`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  animation: ${fadeSlideUp} 0.6s 0.5s ease both;
  opacity: 0;
  animation-fill-mode: forwards;

  @media (max-width: 960px) {
    justify-content: center;
  }
`;

const ResumeBtn = styled.a`
  text-decoration: none;
  padding: 14px 36px;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #854ce6, #c471ed);
  color: #fff;
  border: none;
  box-shadow: 0 4px 24px #854ce644;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 32px #854ce666;
  }
`;

const OutlineBtn = styled.a`
  text-decoration: none;
  padding: 13px 32px;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;
  color: ${({ theme }) => theme.primary};
  border: 2px solid ${({ theme }) => theme.primary}66;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary}14;
    transform: translateY(-3px);
  }
`;

const SocialRow = styled(motion.div)`
  display: flex;
  gap: 14px;
  margin-top: 28px;
  animation: ${fadeSlideUp} 0.6s 0.6s ease both;
  opacity: 0;
  animation-fill-mode: forwards;

  @media (max-width: 960px) {
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.primary}33;
  color: ${({ theme }) => theme.text_secondary};
  text-decoration: none;
  transition: all 0.25s ease;
  background: ${({ theme }) => theme.card};

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary}14;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px ${({ theme }) => theme.primary}22;
  }

  svg {
    font-size: 20px;
  }
`;

// ── Right side / Photo ───────────────────────────────────────────────────────

const RightCol = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${floatY} 5s ease-in-out infinite;

  @media (max-width: 960px) {
    animation: none;
  }
`;

const PhotoWrapper = styled.div`
  position: relative;
  width: 340px;
  height: 340px;

  /* Gradient fade mask — bottom edge melts into background */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 5%;
    background: linear-gradient(
      to top,
      ${({ theme }) => theme.bg} 0%,
      ${({ theme }) => theme.bg}bb 30%,
      transparent 100%
    );
    border-radius: 0 0 50% 50%;
    z-index: 4;
    pointer-events: none;
  }

  @media (max-width: 640px) {
    width: 280px;
    height: 280px;
  }
`;

/* Spinning gradient ring behind photo */
const SpinRing = styled.div`
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  background: conic-gradient(
    #854ce6,
    #c471ed,
    #0070f3,
    #854ce6
  );
  animation: ${borderSpin} 6s linear infinite;
  z-index: 0;
`;

const SpinRingMask = styled.div`
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: ${({ theme }) => theme.bg};
  z-index: 1;
`;

const Photo = styled.img`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 10%;
  display: block;
`;

/* Floating stat chips around the photo */
const StatChip = styled.div`
  position: absolute;
  z-index: 3;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.primary}33;
  border-radius: 16px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 8px 24px #00000044;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  animation: ${floatY} 4s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay || "0s"};

  span.emoji {
    font-size: 18px;
  }

  &.top-right {
    top: -12px;
    right: -40px;
  }
  &.bottom-left {
    bottom: 10px;
    left: -50px;
  }

  @media (max-width: 960px) {
    display: none;
  }
`;

// ── Component ────────────────────────────────────────────────────────────────

const Hero = () => {
  return (
    <div id="About">
      <HeroSection>
        {/* Background */}
        <HeroBg>
          <StarCanvas />
          <HeroBgAnimation />
          <GlowBlob className="blob-left" />
          <GlowBlob className="blob-right" />
        </HeroBg>

        <InnerContainer>
          {/* ── LEFT COLUMN ── */}
          <LeftCol>
            
<Greeting>Hello, I&apos;m</Greeting>
            <Name>{Bio.name}</Name>

            <RoleRow>
              <RoleLabel>I build as a&nbsp;</RoleLabel>
              <TypewriterWrap>
                <Typewriter
                  options={{
                    strings: Bio.roles,
                    autoStart: true,
                    loop: true,
                    cursor: "|",
                  }}
                />
              </TypewriterWrap>
            </RoleRow>

            <Divider />

            <Description>{Bio.description}</Description>

            <ButtonRow>
              <ResumeBtn href={Bio.resume} target="_blank" rel="noopener noreferrer">
                View Resume ↗
              </ResumeBtn>
              <OutlineBtn href="#Contact">
                Let's Talk
              </OutlineBtn>
            </ButtonRow>

            <SocialRow>
              <SocialIcon href={Bio.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHubIcon />
              </SocialIcon>
              <SocialIcon href={Bio.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon />
              </SocialIcon>
            </SocialRow>
          </LeftCol>

          {/* ── RIGHT COLUMN ── */}
          <RightCol>
            <PhotoWrapper>
                <Photo src={HeroImg} alt={Bio.name} />
              

            </PhotoWrapper>
          </RightCol>
        </InnerContainer>
      </HeroSection>
    </div>
  );
};

export default Hero;