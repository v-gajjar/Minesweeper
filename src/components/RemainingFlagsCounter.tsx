import React from "react";

type Props = {
  remainingFlagsCount: number;
};

const RemainingFlagsCounter: React.FC<Props> = ({ remainingFlagsCount }) => {
  return (
    <div data-testid="remaining-flags">
      Remaining Flags: {remainingFlagsCount}
    </div>
  );
};

export default RemainingFlagsCounter;
