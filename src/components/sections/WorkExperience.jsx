import React from "react";
import styled, { keyframes } from "styled-components";
import { workExperiences } from "../../data/constants";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
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

const TimelineWrapper = styled.div`
  width: 100%;
  max-width: 860px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 36px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      transparent,
      ${({ theme }) => theme.primary}55,
      ${({ theme }) => theme.primary},
      ${({ theme }) => theme.primary}55,
      transparent
    );

    @media (max-width: 640px) {
      left: 20px;
    }
  }
`;

const Card = styled.div`
  display: flex;
  gap: 28px;
  align-items: flex-start;
  margin-bottom: 40px;
  animation: ${fadeUp} 0.6s ease both;
  animation-delay: ${({ index }) => index * 0.15}s;

  @media (max-width: 640px) {
    gap: 16px;
  }
`;

const DotColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 18px;
  flex-shrink: 0;
`;

const Dot = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  box-shadow: 0 0 0 4px ${({ theme }) => theme.primary}33;
  z-index: 1;
  flex-shrink: 0;
`;

const CardBody = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.primary}22;
  border-radius: 20px;
  padding: 24px 28px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${({ theme }) => theme.primary}, #b620e0);
    border-radius: 20px 20px 0 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    border-color: ${({ theme }) => theme.primary}55;
    box-shadow: 0 8px 32px ${({ theme }) => theme.primary}22;
    transform: translateY(-3px);

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 640px) {
    padding: 18px 18px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
`;

const CompanyLogo = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 12px;
  object-fit: contain;
  background: ${({ theme }) => theme.card_light || "#ffffff12"};
  padding: 6px;
  border: 1px solid ${({ theme }) => theme.primary}22;
  flex-shrink: 0;
`;

const HeaderText = styled.div`
  flex: 1;
`;

const Role = styled.h3`
  font-size: 19px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0 0 2px;

  @media (max-width: 640px) {
    font-size: 16px;
  }
`;

const Company = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  margin: 0;
`;

const Date = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  background: ${({ theme }) => theme.primary}18;
  border: 1px solid ${({ theme }) => theme.primary}30;
  border-radius: 20px;
  padding: 3px 12px;
  white-space: nowrap;
  align-self: flex-start;
  margin-top: 4px;
  flex-shrink: 0;
`;

const Desc = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.7;
  margin: 12px 0;
`;

const SkillsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
`;

const SkillChip = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.primary}18;
  border: 1px solid ${({ theme }) => theme.primary}40;
  border-radius: 20px;
  padding: 4px 14px;
  letter-spacing: 0.3px;
`;

const WorkExperience = () => {
  return (
    <Container id="WorkExperience">
      <Title>Work Experience</Title>
      <Subtitle>
        My professional journey and the companies I've had the privilege to work with.
      </Subtitle>

      <TimelineWrapper>
        {workExperiences.map((exp, index) => (
          <Card key={exp.id} index={index}>
            <DotColumn>
              <Dot />
            </DotColumn>

            <CardBody>
              <CardHeader>
                <CompanyLogo src={exp.img} alt={exp.company} onError={(e) => { e.target.style.display = "none"; }} />
                <HeaderText>
                  <Role>{exp.role}</Role>
                  <Company>{exp.company}</Company>
                </HeaderText>
                <Date>{exp.date}</Date>
              </CardHeader>

              <Desc>{exp.desc}</Desc>

              <SkillsRow>
                {exp.skills.map((skill) => (
                  <SkillChip key={skill}>{skill}</SkillChip>
                ))}
              </SkillsRow>
            </CardBody>
          </Card>
        ))}
      </TimelineWrapper>
    </Container>
  );
};

export default WorkExperience;
