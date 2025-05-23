import React, { useState } from "react";
import {
  ColumnsContainer,
  GridColumn,
  GridContainer,
  SettingsLabel,
} from "../settings.styles.js";

const Columns = ({ maxWidth, handleSettingsChange }) => {
  const [hoveredColumns, setHoveredColumns] = useState(null); // Отслеживание колонок при наведении

  const handleColumnClick = (colIndex) => {
    handleSettingsChange({
      target: {
        name: "maxWidth",
        value: colIndex + 1,
      },
    });
  };

  const handleMouseEnter = (colIndex) => {
    setHoveredColumns(colIndex + 1); // Установить количество колонок при наведении
  };

  return (
    <ColumnsContainer>
      <div>
        <SettingsLabel>Ширина блока</SettingsLabel>
        <SettingsLabel>
          {hoveredColumns || maxWidth} <span>колонок</span>
        </SettingsLabel>
      </div>
      <GridContainer onMouseLeave={() => setHoveredColumns(null)}>
        {Array.from({ length: 12 }, (_, index) => (
          <GridColumn
            key={index}
            $isSelected={index < maxWidth}
            onClick={() => handleColumnClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
          />
        ))}
      </GridContainer>
    </ColumnsContainer>
  );
};

export default Columns;
