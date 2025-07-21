import { Flag } from "@phosphor-icons/react"
import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import type { RemainingFlagsCounterProps } from "./RemainingFlagsCounter.interface";

function RemainingFlagsCounter({ remainingFlagsCount }: RemainingFlagsCounterProps) {
    return (

        <div id="remainingFlagsCounter" data-testid="flags-remaining">

            <AccessibleIcon label="flag icon">
                <Flag size={25} color="#c01c28" weight="fill" />
            </AccessibleIcon>
            <span id="remainingFlagsLabel">Remaining Flags:</span>
            <span id="remainingFlagsCount">{remainingFlagsCount}</span>

        </div>
    );
}

export default RemainingFlagsCounter;
