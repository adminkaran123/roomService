import { Box, styled } from "@mui/material";
export const Wrapper = styled(Box)`
  margin: auto 0;
  padding: 40px 0;
  display: grid;
  grid-template-columns: repeat(1, 340px);
  grid-auto-rows: 560px;
  grid-gap: 80px;
  align-items: stretch;
  display: flex;
  max-width: 90%;
  margin-bottom: 30px;
  margin: 0 auto;

  @media (min-width: 840px) and (max-width: 1259px) {
    .container {
      grid-template-columns: repeat(2, 340px);
    }
  }

  @media (min-width: 1260px) {
    .container {
      grid-template-columns: repeat(3, 340px);
    }
  }

  .box {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
    background: linear-gradient(0deg, #202020, #464646);
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    border-bottom-left-radius: 150px;
    border-bottom-right-radius: 150px;
    border: 3px solid #ffc98e;
    box-shadow: 0 0 0 6px #323232, 0 0 0 10px #ffc98e, 0 0 0 20px #323232,
      0 10px 150px rgba(0, 0, 0, 1);
    transition: 0.5s;
  }

  @media (min-width: 840px) {
    .box:hover {
      transform: scale(1.1);
    }
  }

  .box::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    pointer-events: none;
  }

  .box .title .fa {
    margin-top: 20px;
    font-size: 60px;
    color: #ffc98e;
  }

  .box .title h2 {
    color: #fff;
    margin: 20px 0 0;
    padding: 0;
  }

  .box .price h4 {
    font-size: 60px;
    color: #ffc98e;
    margin: 10px 0;
    padding: 0;
  }

  .box .option ul {
    margin: 20px 0;
    padding: 0;
    list-style: none;
  }

  .box .option ul li {
    color: #fff;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .box .option ul li:last-child {
    border-bottom: none;
  }

  .box .btn {
    display: inline-block;
    background: #ffc98e;
    color: #262626;
    font-weight: bold;
    padding: 10px 30px;
    margin-top: 20px;
    text-decoration: none;
    border-radius: 10px;
  }
`;
