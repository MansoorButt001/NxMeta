import React from "react";

const RuleComponent = ({ eventRule }: { eventRule: any }) => {
  console.log(eventRule);
  return <div className="rounded-md border-2 p-14">Event: {eventRule.id}</div>;
};

export default RuleComponent;
