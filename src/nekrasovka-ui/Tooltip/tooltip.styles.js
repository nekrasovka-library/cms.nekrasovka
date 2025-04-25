import styled from "styled-components";

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;

  > div {
    &:nth-child(1) {
      display: inline-block;
    }

    &:nth-child(2) {
      position: absolute;
      ${({ $position }) =>
        $position === "top" &&
        `
        bottom: calc(100% + 5px);
        left: 50%;
        transform: translateX(-50%);
      `};
      ${({ $position }) =>
        $position === "bottom" &&
        `
        top: calc(100% + 5px);
        left: 50%;
        transform: translateX(-50%);
      `};
      ${({ $position }) =>
        $position === "left" &&
        `
        right: calc(100% + 5px);
        top: 50%;
        transform: translateY(-50%);
      `};
      ${({ $position }) =>
        $position === "right" &&
        `
        left: calc(100% + 5px);
        top: 50%;
        transform: translateY(-50%);
      `};

      background-color: #777777;
      color: #fff;
      font-size: 12px;
      padding: 5px 10px;
      border-radius: 5px;
      white-space: nowrap;
      pointer-events: none;
      transition:
        opacity 0.3s,
        transform 0.3s;
      opacity: ${({ $isVisible }) => ($isVisible ? "1" : "0")};
    }
  }
`;

export { TooltipWrapper };
