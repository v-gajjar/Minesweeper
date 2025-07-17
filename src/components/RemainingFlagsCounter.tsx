import { Flag } from "@phosphor-icons/react";
import { AccessibleIcon } from "@radix-ui/react-accessible-icon";

function RemainingFlagsCounter({ remainingFlagsCount }) {
  return (
    <div id="remainingFlagsCounter" data-testid="flags-remaining">
      <AccessibleIcon label="flag icon">
        <Flag
          size={25}
          color="#c01c28"
          weight="fill"
          style={{ margin: "0px 10px 0px 0px" }}
        />
      </AccessibleIcon>
      Remaining Flags: {remainingFlagsCount}
    </div>
  );
}

export default RemainingFlagsCounter;
