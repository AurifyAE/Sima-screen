import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

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
          // gap: "0.5vw",
          gap: {
            xs: "10px",
            lg: "0.5vw",
          },
          flex: 0,
          minWidth: "13.5vw",
        }}
      >
        <Typography
          sx={{
            // fontSize: "2vw",
            fontSize: {
              xs: "18px",
              lg: "2vw",
            },
            fontWeight: 700,
            letterSpacing: "0.2vw",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: "0.5vw",
          }}
        >
          {label}

          <img
            src="/images/dlr-icon.png"
            width={{
              xs: "30vw",
              lg: "35vw",
            }}
          />
        </Typography>

        <Box
          sx={{
            border: "0.2vw solid #fff",
            borderRadius: "0.6vw",
            px: "2vw",
            textAlign: "center",
            width: '100%',

          }}
        >
          <Typography
            sx={{
              // fontSize: "2.5vw",
              fontSize: {
                xs: "20px",
                lg: "2.5vw",
              },
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
          // p: "1vw ",
          p: {
            xs: "15px",
            lg: "1vw",
          },
          gap: "2vw ",
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "1fr 1fr 1fr  ",
        }}
      >
        <Typography
          sx={{
            // fontSize: "2vw",
            fontSize: {
              xs: "18px",
              lg: "1.7vw",
            },
            fontWeight: 700,
            color: "#fff",
            width: "8vw",
            flex: "0",
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: {
              xs: "10px",
              lg: "1.5vw",
            },
            width: 'fit-content'
          }}>



          <PricePulse label="BID " value={data.bid} />
          <PricePulse label="ASK " value={data.ask} />
        </Box>



        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // gap: "1vw",
            gap: {
              xs: "10px",
              lg: "1vw",
            },
            flex: "0",
            width: "14vw",

          }}
        >

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1vw",
              flex: "0",
            }}
          >
            <Typography
              sx={{
                color: "red",

                // fontSize: "2vw",

                fontSize: {
                  xs: "18px",
                  lg: "2vw",
                },
                flex: "0",
              }}
            >
              ▼
            </Typography>
            <Typography
              sx={{
                // fontSize: "2vw",
                fontSize: {
                  xs: "18px",
                  lg: "2vw",
                },
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
            <Typography
              sx={{
                color: "green",
                //  fontSize: "2vw",

                fontSize: {
                  xs: "18px",
                  lg: "2vw",
                },
                flex: "0",
              }}
            >
              ▲
            </Typography>
            <Typography
              sx={{
                // fontSize: "2vw",
                fontSize: {
                  xs: "18px",
                  lg: "2vw",
                },

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
      </Box >
    );
  };

  return (
    <Box sx={{ p: "1.5vw 1vw", pt: "0", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5vw",
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
              // fontSize: "1.5vw",

              fontSize: {
                xs: "18px",
                lg: "1.5vw",
              },
              fontWeight: 800,
              color: "#000",
            }}
          >
            SPOT RATE
          </Typography>
        </Box>
        <MetalPanel title="GOLD" data={goldData} theme="gold" />
        <MetalPanel title="SILVER" data={silverData} theme="silver" />
      </Box>
    </Box>
  );
};

export default SpotRate;
