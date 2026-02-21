import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const SystemClock = () => {
    const [timeData, setTimeData] = useState({
        day: "",
        date: "",
        time: "",
    });

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();

            // Day
            const dayStr = now
                .toLocaleDateString("en-GB", { weekday: "long" })
                .toUpperCase();

            // Date
            const dateStr = now
                .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })
                .toUpperCase();

            // Time (System Time)
            const timeStr = now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            });

            setTimeData({
                day: dayStr,
                date: dateStr,
                time: timeStr,
            });
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
            }}
        >
            {/* Time */}
            <Typography
                sx={{
                    fontSize: "2.5vw",
                    fontWeight: 600,
                    color: "#ffffff",
                }}
            >
                {timeData.time || "--:--:--"}
            </Typography>

            {/* Day */}
            <Typography
                sx={{
                    fontSize: "1.8vw",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    letterSpacing: "1px",
                }}
            >
                {timeData.day || "-----"}
            </Typography>

            {/* Date */}
            <Typography
                sx={{
                    fontSize: "1.8vw",
                    fontWeight: 700,
                    letterSpacing: "1.2px",
                    color: "#FFFFFF",

                }}
            >
                {timeData.date || "-- --- ----"}
            </Typography>


        </Box>
    );
};

export default SystemClock;
