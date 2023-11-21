import React from "react";
import { Wrapper } from "./Pricing.styles";
import { plans } from "../../utils/constants/constants";
import { Button } from "@mui/material";
import usePricing from "./Pricing.hooks";

function PricingTable() {
  const { purchasePlan } = usePricing();
  return (
    <Wrapper>
      <h2 style={{ textAlign: "center" }}>Choose A Plan</h2>
      <p style={{ textAlign: "center" }}>
        Select a plan which suits your need.
      </p>
      <div className="columns">
        <ul className="price">
          <li className="header">Basic</li>
          <li className="grey">$ 9.99 / year</li>
          <li>10GB Storage</li>
          <li>10 Emails</li>
          <li>10 Domains</li>
          <li>1GB Bandwidth</li>
          <li className="grey">
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                purchasePlan(plans.basic);
              }}
            >
              Select Plan
            </Button>
          </li>
        </ul>
      </div>
      <div className="columns">
        <ul className="price">
          <li className="header" style={{ backgroundColor: "#777cf0" }}>
            Pro
          </li>
          <li className="grey">$ 24.99 / year</li>
          <li>25GB Storage</li>
          <li>25 Emails</li>
          <li>25 Domains</li>
          <li>2GB Bandwidth</li>
          <li className="grey">
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                purchasePlan(plans.plus);
              }}
            >
              Select Plan
            </Button>
          </li>
        </ul>
      </div>
      <div className="columns">
        <ul className="price">
          <li className="header">Premium</li>
          <li className="grey">$ 49.99 / year</li>
          <li>50GB Storage</li>
          <li>50 Emails</li>
          <li>50 Domains</li>
          <li>5GB Bandwidth</li>
          <li className="grey">
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                purchasePlan(plans.premium);
              }}
            >
              Select Plan
            </Button>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
}

export default PricingTable;
