import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

import goldImg from "/images/gold-biscut.png";
import silverImg from "/images/silver-biscut.png";

const SpotRate = () => {
  const { goldData, silverData } = useSpotRate();

  const [goldBidDir, setGoldBidDir] = useState("neutral");
  const [goldAskDir, setGoldAskDir] = useState("neutral");
  const [silverBidDir, setSilverBidDir] = useState("neutral");
  const [silverAskDir, setSilverAskDir] = useState("neutral");

  const prev = useRef({
    goldBid: null,
    goldAsk: null,
    silverBid: null,
    silverAsk: null,
  });

  const detectChange = (prevVal, currVal, setDir) => {
    if (prevVal === null) return currVal;

    if (currVal > prevVal) {
      setDir("rise");
      setTimeout(() => setDir("neutral"), 800);
    } else if (currVal < prevVal) {
      setDir("fall");
      setTimeout(() => setDir("neutral"), 800);
    }

    return currVal;
  };

  useEffect(() => {
    prev.current.goldBid = detectChange(
      prev.current.goldBid,
      goldData.bid,
      setGoldBidDir,
    );
  }, [goldData.bid]);

  useEffect(() => {
    prev.current.goldAsk = detectChange(
      prev.current.goldAsk,
      goldData.ask,
      setGoldAskDir,
    );
  }, [goldData.ask]);

  useEffect(() => {
    prev.current.silverBid = detectChange(
      prev.current.silverBid,
      silverData.bid,
      setSilverBidDir,
    );
  }, [silverData.bid]);

  useEffect(() => {
    prev.current.silverAsk = detectChange(
      prev.current.silverAsk,
      silverData.ask,
      setSilverAskDir,
    );
  }, [silverData.ask]);

  const PricePulse = ({ label, value }) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5vw",
          flex: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: "2vw",
            fontWeight: 700,
            letterSpacing: "0.2vw",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: "0.5vw",
          }}
        >
          {label}

          <img src="/images/dlr-icon.png" />
        </Typography>

        <Box
          sx={{
            border: "0.2vw solid #fff",
            borderRadius: "0.6vw",
            px: "2vw",
            minWidth: "14vw",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "2.5vw",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            {value}
          </Typography>
        </Box>
      </Box>
    );
  };

  const MetalPanel = ({ title, data, theme }) => {
    return (
      <Box
        sx={{
          border: "0.15vw solid #FFD700",
          borderRadius: "1.2vw",
          bgcolor: "#000",
          p: "1vw ",
          gap: "2vw ",
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        <Typography
          sx={{
            fontSize: "2vw",
            fontWeight: 700,
            color: "#fff",
            width: "10vw",
          }}
        >
          {title}
        </Typography>

        <PricePulse label="BID " value={data.bid} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1vw",
          }}
        >
          {/* LOW */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1vw",
            }}
          >
            <Typography sx={{ color: "red", fontSize: "2vw", flex: "0" }}>
              ▼
            </Typography>
            <Typography
              sx={{
                fontSize: "2vw",
                fontWeight: 700,
                bgcolor: "#FFFFFF",
                borderRadius: "0.6vw",
                px: "1.5vw",
                py: "0.5vw",
                flex: "1",

                color: "black",
              }}
            >
              {data.low}
            </Typography>
          </Box>

          {/* HIGH */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1vw",
            }}
          >
            <Typography sx={{ color: "green", fontSize: "2vw", flex: "0" }}>
              ▲
            </Typography>
            <Typography
              sx={{
                fontSize: "2vw",
                fontWeight: 700,
                bgcolor: "#FFFFFF",
                borderRadius: "0.6vw",
                px: "1.5vw",
                color: "black",
                flex: "1",

                py: "0.5vw",

              }}
            >
              {data.high}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ p: "1.5vw 1vw", pt: '0' }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5vw",
          mx: "auto",
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(90deg,#caa43c,#f4e27a,#caa43c)",
            borderRadius: "1vw",
            textAlign: "center",
            py: "0.8vw",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.5vw",
              fontWeight: 800,
              color: "#000",
            }}
          >
            SPOT RATE
          </Typography>
        </Box>
        <MetalPanel title="SILVER" data={silverData} theme="silver" />
        <MetalPanel title="GOLD" data={goldData} theme="gold" />
      </Box>
    </Box>
  );
};

export default SpotRate;
