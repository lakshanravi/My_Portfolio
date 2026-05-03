import React from "react";
import styled, { keyframes } from "styled-components";
import { experiences } from "../../data/constants";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

// ── Achievement config ────────────────────────────────────────────────────────

const getAchievement = (company = "") => {
  const val = company.toLowerCase();
  if (val.includes("winner") || val.includes("1st"))
    return { Icon: EmojiEventsIcon, color: "#FFD700", bg: "#FFD70018" };
  if (val.includes("runner") || val.includes("2nd") || val.includes("third") || val.includes("3rd"))
    return { Icon: EmojiEventsIcon, color: "#854ce6", bg: "#854ce618" };
  if (val.includes("finalist"))
    return { Icon: EmojiEventsIcon, color: "#FFD700", bg: "#FFD70018" };
  if (val.includes("semi"))
    return { Icon: MilitaryTechIcon, color: "#C0C0C0", bg: "#C0C0C018" };
  return { Icon: LightbulbIcon, color: "#38bdf8", bg: "#38bdf818" };
};

// ── Animations ────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ── Layout ────────────────────────────────────────────────────────────────────

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  padding: 0 24px;
  position: relative;
  z-index: 1;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 860px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: clamp(28px, 5vw, 48px);
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
  margin: 0 0 12px;
  letter-spacing: -0.5px;
`;

const Desc = styled.p`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  max-width: 580px;
  line-height: 1.7;
  margin: 0 0 56px;
`;

// ── Timeline ──────────────────────────────────────────────────────────────────

const TimelineList = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;

  /* Vertical line */
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    background: ${({ theme }) => theme.text_secondary}22;
    transform: translateX(-50%);
    z-index: 0;
  }

  @media (max-width: 768px) {
    &::before {
      left: 20px;
    }
  }
`;

const TimelineItem = styled.div`
  display: flex;
  justify-content: ${({ even }) => (even ? "flex-start" : "flex-end")};
  padding: ${({ even }) => (even ? "0 0 40px calc(50% + 40px)" : "0 calc(50% + 40px) 40px 0")};
  position: relative;
  animation: ${fadeUp} 0.5s ${({ index }) => index * 0.08}s ease both;
  opacity: 0;
  animation-fill-mode: forwards;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding: 0 0 32px 52px;
  }
`;

/* Dot on the line */
const Dot = styled.div`
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ color }) => color};
  box-shadow: 0 0 0 3px ${({ color }) => color}33;
  z-index: 1;
  flex-shrink: 0;

  @media (max-width: 768px) {
    left: 20px;
    transform: translateX(-50%);
  }
`;

// ── Card ──────────────────────────────────────────────────────────────────────

const Card = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.card || "rgba(17,25,40,0.85)"};
  border: 1px solid ${({ color }) => color}28;
  border-radius: 12px;
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: ${({ color }) => color}55;
    box-shadow: 0 8px 32px ${({ color }) => color}14;
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
`;

const IconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: ${({ bg }) => bg};
  border: 1px solid ${({ color }) => color}33;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    font-size: 22px;
    color: ${({ color }) => color};
  }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
`;

const Role = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.3;
`;

const Company = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ color }) => color};
`;

const DateLabel = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 2px;
`;

const CardDesc = styled.p`
  font-size: 13.5px;
  line-height: 1.75;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
`;

// ── Component ─────────────────────────────────────────────────────────────────

const ExperienceCard = ({ experience, index }) => {
  const { Icon, color, bg } = getAchievement(experience?.company);

  return (
    <TimelineItem even={index % 2 === 0} index={index}>
      <Dot color={color} />
      <Card color={color}>
        <CardTop>
          <IconBox color={color} bg={bg}>
            <Icon />
          </IconBox>
          <CardBody>
            <Role>{experience?.role}</Role>
            <Company color={color}>{experience?.company}</Company>
            <DateLabel>{experience?.date}</DateLabel>
          </CardBody>
        </CardTop>
        {experience?.desc && <CardDesc>{experience.desc}</CardDesc>}
      </Card>
    </TimelineItem>
  );
};

const Experience = () => {
  return (
    <Container id="Experience">
      <Wrapper>
        <Title>Achievements</Title>
        <Desc>
          Earned multiple awards for innovation and excellence in prestigious
          tech competitions, highlighting my commitment to advancing in the field.
        </Desc>

        <TimelineList>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
              index={index}
            />
          ))}
        </TimelineList>
      </Wrapper>
    </Container>
  );
};

export default Experience;