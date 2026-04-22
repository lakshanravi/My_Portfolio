import React from "react";
import styled, { keyframes } from "styled-components";
import { Bio } from "../../data/constants";
import Typewriter from "typewriter-effect";
import HeroImg from "../../images/HeroImage-Photoroom.png";
import StarCanvas from "../canvas/Stars";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// ── Minimal, purposeful animations only ─────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ── Layout ───────────────────────────────────────────────────────────────────

const HeroSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  padding: 50px 24px 80px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 100px 20px 60px;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const InnerContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 80px;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 960px) {
    flex-direction: column-reverse;
    gap: 48px;
    text-align: center;
  }
`;

// ── Left side ────────────────────────────────────────────────────────────────

const LeftCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 960px) {
    align-items: center;
  }
`;




const Greeting = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0 0 8px;
  animation: ${fadeUp} 0.5s 0.1s ease both;
  opacity: 0;
  animation-fill-mode: forwards;
  letter-spacing: 0.2px;
`;

const Name = styled.h1`
  font-size: clamp(38px, 5.5vw, 64px);
  font-weight: 700;
  line-height: 1.1;
  margin: 0 0 20px;
  color: ${({ theme }) => theme.text_primary};
  animation: ${fadeUp} 0.5s 0.15s ease both;
  opacity: 0;
  animation-fill-mode: forwards;
  letter-spacing: -1px;
`;

const RoleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: clamp(16px, 2vw, 22px);
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 28px;
  animation: ${fadeUp} 0.5s 0.2s ease both;
  opacity: 0;
  animation-fill-mode: forwards;

  @media (max-width: 960px) {
    justify-content: center;
  }
`;

const TypewriterWrap = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;

const Divider = styled.div`
  width: 40px;
  height: 2px;
  border-radius: 1px;
  background: ${({ theme }) => theme.primary};
  margin: 0 0 24px;
  opacity: 0.6;
  animation: ${fadeUp} 0.5s 0.25s ease both;
  animation-fill-mode: forwards;

  @media (max-width: 960px) {
    align-self: center;
  }
`;

const Description = styled.p`
  font-size: 15.5px;
  line-height: 1.85;
  color: ${({ theme }) => theme.text_secondary};
  max-width: 480px;
  margin: 0 0 36px;
  animation: ${fadeUp} 0.5s 0.3s ease both;
  opacity: 0;
  animation-fill-mode: forwards;

  @media (max-width: 960px) {
    text-align: center;
    max-width: 520px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.5s 0.35s ease both;
  opacity: 0;
  animation-fill-mode: forwards;

  @media (max-width: 960px) {
    justify-content: center;
  }
`;

const ResumeBtn = styled.a`
  text-decoration: none;
  padding: 12px 28px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border: none;

  &:hover {
    opacity: 0.88;
    transform: translateY(-2px);
  }
`;

const OutlineBtn = styled.a`
  text-decoration: none;
  padding: 11px 26px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  border: 1.5px solid ${({ theme }) => theme.text_secondary}44;

  &:hover {
    background: ${({ theme }) => theme.card};
    border-color: ${({ theme }) => theme.text_secondary}88;
    transform: translateY(-2px);
  }
`;

const SocialRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
  animation: ${fadeUp} 0.5s 0.4s ease both;
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
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1.5px solid ${({ theme }) => theme.text_secondary}33;
  color: ${({ theme }) => theme.text_secondary};
  text-decoration: none;
  transition: all 0.2s ease;
  background: transparent;

  &:hover {
    border-color: ${({ theme }) => theme.primary}88;
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.card};
    transform: translateY(-2px);
  }

  svg {
    font-size: 19px;
  }
`;

// ── Right side / Photo ───────────────────────────────────────────────────────

const RightCol = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeUp} 0.6s 0.1s ease both;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const PhotoWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 400px;

  @media (max-width: 640px) {
    width: 220px;
    height: 220px;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  object-fit: cover;
  object-position: center top;
  display: block;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
`;

// ── Component ────────────────────────────────────────────────────────────────

const Hero = () => {
  return (
    <div id="About">
      <HeroSection>
        <HeroBg>
          <StarCanvas />
        </HeroBg>

        <InnerContainer>
          {/* ── LEFT COLUMN ── */}
          <LeftCol>
            {/*  <AvailableBadge>
              <GreenDot />
              Open to opportunities
            </AvailableBadge>
*/}
            <Greeting>Hey there, I&apos;m</Greeting>

            <Name>{Bio.name}</Name>

            <RoleRow>
              I build as a&nbsp;
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