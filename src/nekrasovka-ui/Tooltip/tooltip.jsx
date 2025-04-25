import React, { useState } from "react";
import { useIsMobile } from "../../helpers";
import { TooltipWrapper } from "./tooltip.styles";

const Tooltip = ({ children, text, position = "top" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile(700);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <TooltipWrapper $position={position} $isVisible={isVisible}>
      {isMobile ? (
        children
      ) : (
        <>
          <div onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
            {children}
          </div>
          <div>{text}</div>
        </>
      )}
    </TooltipWrapper>
  );
};

export default Tooltip;
