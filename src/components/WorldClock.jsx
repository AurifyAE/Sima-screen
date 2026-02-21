import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const clockConfig = [
  {
    key: "london",
    label: "LONDON",
    timeZone: "Europe/London",
    flag: "/images/uk.png",
  },
  {
    key: "usa",
    label: "USA",
    timeZone: "America/New_York",
    flag: "/images/usa.png",
  },
  {
    key: "china",
    label: "CHINA",
    timeZone: "Asia/Shanghai",
    flag: "/images/china.png",
  },
];

const WorldClockHorizontal = () => {
  const [times, setTimes] = useState({});

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };

      const updatedTimes = {};

      clockConfig.forEach((clock) => {
        updatedTimes[clock.key] = now.toLocaleTimeString("en-US", {
          ...timeOptions,
          timeZone: clock.timeZone,
        });
      });

      setTimes(updatedTimes);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        gap: "2vw",
        padding: "1vw 2vw",
        width: "100%",
      }}
    >
      {clockConfig.map((clock) => (
        <Box key={clock.key} sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: "0.5vw",
              fontSize: "1.2vw",
              fontWeight: 500,
              color: "#FFFFFF",
            }}
          >
            <Box sx={{ width: "3vw" }}>
              <img
                src={clock.flag}
                alt={clock.label}
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
            {clock.label}
          </Typography>

          <Typography sx={{ fontSize: "1.2vw", color: "#fff" }}>
            {times[clock.key] || "--:-- AM"}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default WorldClockHorizontal;
