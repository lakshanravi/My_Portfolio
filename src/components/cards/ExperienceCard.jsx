import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import styled from "styled-components";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import StarIcon from "@mui/icons-material/Star";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

// ── Pick icon + colour based on achievement result ────────────────────────────
const getAchievement = (company = "") => {
  const val = company.toLowerCase();
  if (val.includes("winner") || val.includes("1st"))
    return { Icon: EmojiEventsIcon, color: "#FFD700", bg: "#FFD70022" };
  if (val.includes("runner") || val.includes("2nd") || val.includes("third") || val.includes("3rd"))
    return  { Icon: EmojiEventsIcon, color: "#854ce6", bg: "#854ce622" };
  if (val.includes("finalist"))
    return { Icon: EmojiEventsIcon, color: "#FFD700", bg: "#FFD70022" };
  if (val.includes("semi"))
    return { Icon: MilitaryTechIcon, color: "#C0C0C0", bg: "#C0C0C022" };
  return { Icon: LightbulbIcon, color: "#38bdf8", bg: "#38bdf822" };
};

// ── Styled components ─────────────────────────────────────────────────────────

const Top = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 14px;
`;

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${({ bg }) => bg};
  border: 1px solid ${({ color }) => color}44;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    font-size: 26px;
    color: ${({ color }) => color};
  }

  @media (max-width: 768px) {
    width: 38px;
    height: 38px;
    svg { font-size: 20px; }
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Role = styled.div`
  font-size: 17px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};

  @media (max-width: 768px) { font-size: 14px; }
`;

const Company = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ color }) => color};

  @media (max-width: 768px) { font-size: 12px; }
`;

const Date = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};

  @media (max-width: 768px) { font-size: 10px; }
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_secondary};

  @media (max-width: 768px) { font-size: 12px; }
`;

// ── Component ─────────────────────────────────────────────────────────────────

const ExperienceCard = ({ experience }) => {
  const { Icon, color, bg } = getAchievement(experience?.company);

  return (
    <VerticalTimelineElement
      icon={
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon style={{ color, fontSize: 26 }} />
        </div>
      }
      contentStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: "rgba(17, 25, 40, 0.83)",
        color: "#fff",
        boxShadow: `${color}22 0px 4px 24px`,
        border: `1px solid ${color}33`,
        borderRadius: "12px",
      }}
      contentArrowStyle={{
        borderRight: `7px solid ${color}55`,
      }}
      date={experience?.date}
    >
      <Top>
        <IconBox color={color} bg={bg}>
          <Icon />
        </IconBox>
        <Body>
          <Role>{experience?.role}</Role>
          <Company color={color}>{experience?.company}</Company>
          <Date>{experience?.date}</Date>
        </Body>
      </Top>

      <Description>{experience?.desc}</Description>
    </VerticalTimelineElement>
  );
};

export default ExperienceCard;
