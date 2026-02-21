import React from "react";
import { Box, Typography } from "@mui/material";

const NewsTicker = ({ newsItems = [] }) => {
  // Ensure enough items for smooth scrolling
  const tickerItems =
    newsItems.length <= 1 ? Array(5).fill(newsItems[0]) : newsItems;

  return (
    <Box
      sx={{
        width: "100%",
        height: "3vw",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: " rgba(0,0,0,.4)",
        border: "0.1vw solid #F4DE62",
        borderRadius: '10px',


      }}
    >
      {/* LEFT BRAND */}
      <Typography
        sx={{
          color: "#000000",
          background: 'linear-gradient( 90deg, rgba(178, 129, 44, 1) 0%, rgba(244, 222, 98, 1) 28.00000011920929%, rgba(244, 226, 139, 1) 50.999999046325684%, rgba(244, 222, 98, 1) 70.99999785423279%, rgba(178, 129, 44, 1) 100%)',
          fontSize: "1.2vw",
          fontWeight:'700',
          whiteSpace: "nowrap",
          padding: "0 3.5vw",
          height: "100%",
          display: "flex",
          alignItems: "center",
          borderRadius: '10px',
          justifyContent: "center",

          flexShrink: 0,
        }}
      >
        SIMA GOLD BULLION
      </Typography>

      {/* SCROLL AREA */}
      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <Box
          sx={{
            whiteSpace: "nowrap",
            display: "inline-flex",
            alignItems: "center",
            animation: "ticker 70s linear infinite",
          }}
        >
          {tickerItems.map((item, index) => (
            <Typography
              key={index}
              component="span"
              sx={{
                color: "#e6e6e6",
                fontSize: "1.3vw",
                fontWeight: 500,
                whiteSpace: "nowrap",
                marginRight: "4vw",
              }}
            >
              {item?.description || ""}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* KEYFRAMES */}
      <style>
        {`
          @keyframes ticker {
            0% {
              transform: translateX(30%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default NewsTicker;
