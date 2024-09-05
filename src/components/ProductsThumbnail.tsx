import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CSSObject, styled } from "@mui/material/styles";
//@ts-ignore
import {
  Info,
  InfoEyebrow,
  InfoSlotStyles,
  InfoSubtitle,
  InfoTitle,
} from "../mui-treasury/info-basic";

const useStyles = (): CSSObject & Partial<InfoSlotStyles> => {
  return {
    eyebrow: {
      color: "rgba(255, 255, 255, 0.92)",
      fontFamily: '"Spartan", san-serif',
      lineHeight: 1.4,
      fontSize: "1.0625rem",
      letterSpacing: "1px",
      textTransform: "initial",
      marginBottom: 0,
    },
    title: {
      color: "#fff",
      fontSize: "1.25rem",
      fontWeight: "bold" as const,
      lineHeight: 1.2,
    },
    subtitle: {
      color: "rgba(255, 255, 255, 0.72)",
      lineHeight: 1.5,
      "&:last-child": {
        marginTop: "1rem",
      },
    },
  };
};

const StyledCard = styled(Card)({
  borderRadius: "1rem",
  boxShadow: "none",
  position: "relative",
  minWidth: 200,
  minHeight: 360,
  "&:after": {
    content: '""',
    display: "block",
    position: "absolute",
    width: "100%",
    height: "64%",
    bottom: 0,
    zIndex: 1,
    background: "linear-gradient(to top, #000, rgba(0,0,0,0))",
  },
});

const StyledCardMedia = styled(CardMedia)({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: 0,
  backgroundPosition: "top",
});

const Content = styled("div")(({ theme }) => ({
  padding: theme.spacing(3, 2),
  position: "absolute",
  zIndex: 2,
  bottom: 0,
  width: "100%",
}));

interface Props{
    name:string,
    price:number,
    imgUrl:string
    onClick:React.MouseEventHandler<HTMLDivElement> | undefined
}

export function ProductsThumbnail({name,price,imgUrl,onClick}:Props) {
  return (
    <StyledCard onClick={onClick} style={{cursor:'pointer'}}>
      <StyledCardMedia
        image={imgUrl}
      />
      <Content>
        <Info useStyles={useStyles}>
          <InfoEyebrow>{price}</InfoEyebrow>
          <InfoTitle>{name}</InfoTitle>
          {/* <InfoSubtitle>슈퍼푸드 블루베리🫐</InfoSubtitle> */}
        </Info>
      </Content>
    </StyledCard>
  );
}