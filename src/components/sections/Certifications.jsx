import React from "react";
import styled, { keyframes } from "styled-components";
import { certifications } from "../../data/constants";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const Container = styled.div`
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
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, #b620e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  margin-bottom: 52px;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 1100px;
`;

const Card = styled.a`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ color }) => color}33;
  border-radius: 20px;
  padding: 28px 24px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.35s ease;
  animation: ${fadeUp} 0.6s ease both;
  animation-delay: ${({ index }) => index * 0.12}s;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at top left,
      ${({ color }) => color}18,
      transparent 60%
    );
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ color }) => color},
      transparent
    );
    background-size: 200% auto;
    animation: ${shimmer} 2.5s linear infinite;
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  &:hover {
    transform: translateY(-6px);
    border-color: ${({ color }) => color}66;
    box-shadow: 0 12px 40px ${({ color }) => color}22;

    &::before,
    &::after {
      opacity: 1;
    }
  }
`;

const LogoWrap = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 14px;
  background: ${({ color }) => color}18;
  border: 1px solid ${({ color }) => color}33;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  padding: 10px;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const CertTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0 0 6px;
  line-height: 1.4;
`;

const Issuer = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${({ color }) => color};
  margin: 0 0 10px;
`;

const DateBadge = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  background: ${({ theme }) => theme.text_secondary}18;
  border-radius: 20px;
  padding: 4px 12px;
  margin-top: auto;
`;

const ViewLink = styled.span`
  margin-top: 14px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  gap: 5px;

  &::after {
    content: "→";
    transition: transform 0.2s ease;
  }

  ${Card}:hover &::after {
    transform: translateX(4px);
  }
`;

const Certifications = () => {
  return (
    <Container id="Certifications">
      <Title>Certifications</Title>
      <Subtitle>
        Validated credentials and professional achievements that demonstrate
        continuous learning and expertise.
      </Subtitle>

      <Grid>
        {certifications.map((cert, index) => (
          <Card
            key={cert.id}
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            color={cert.color || "#854CE6"}
            index={index}
          >
            <LogoWrap color={cert.color || "#854CE6"}>
              <Logo src={cert.img} alt={cert.issuer} />
            </LogoWrap>

            <CertTitle>{cert.title}</CertTitle>
            <Issuer color={cert.color || "#854CE6"}>{cert.issuer}</Issuer>
            <DateBadge>🗓 {cert.date}</DateBadge>
            <ViewLink color={cert.color || "#854CE6"}>View Credential</ViewLink>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Certifications;
