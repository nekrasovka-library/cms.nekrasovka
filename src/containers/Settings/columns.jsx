import React, { useState } from "react";
import {
  ColumnsContainer,
  GridColumn,
  GridContainer,
  SettingsLabel,
} from "./settings.styles.js";

const Columns = () => {
  const [selectedColumns, setSelectedColumns] = useState(12); // Количество колонок по умолчанию

  const handleColumnClick = (colIndex) => {
    setSelectedColumns(colIndex + 1); // Установить количество колонок в зависимости от клика
  };

  return (
    <ColumnsContainer>
      <SettingsLabel>Ширина блока</SettingsLabel>
      <GridContainer>
        {Array.from({ length: 12 }, (_, index) => (
          <GridColumn
            key={index}
            isSelected={index < selectedColumns}
            onClick={() => handleColumnClick(index)}
          />
        ))}
      </GridContainer>
      <SettingsLabel>{selectedColumns}</SettingsLabel>
    </ColumnsContainer>
  );
};

export default Columns;
