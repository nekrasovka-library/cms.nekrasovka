import React, { useState } from "react";
import {
  ColumnsContainer,
  GridColumn,
  GridContainer,
  SettingsLabel,
} from "./settings.styles.js";

const Columns = () => {
  const [selectedColumns, setSelectedColumns] = useState(12); // Количество колонок по умолчанию
  const [hoveredColumns, setHoveredColumns] = useState(null); // Отслеживание колонок при наведении

  const handleColumnClick = (colIndex) => {
    setSelectedColumns(colIndex + 1); // Установить количество колонок в зависимости от клика
  };

  const handleMouseEnter = (colIndex) => {
    setHoveredColumns(colIndex + 1); // Установить количество колонок при наведении
  };

  return (
    <ColumnsContainer>
      <div>
        <SettingsLabel>Ширина блока</SettingsLabel>
        <SettingsLabel>
          {hoveredColumns || selectedColumns} <span>колонок</span>
        </SettingsLabel>
      </div>
      <GridContainer onMouseLeave={() => setHoveredColumns(null)}>
        {Array.from({ length: 12 }, (_, index) => (
          <GridColumn
            key={index}
            isSelected={index < selectedColumns}
            onClick={() => handleColumnClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
          />
        ))}
      </GridContainer>
    </ColumnsContainer>
  );
};

export default Columns;
