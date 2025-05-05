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
      <div>
        <SettingsLabel>Ширина блока</SettingsLabel>
        <SettingsLabel>
          {selectedColumns} <span>колонок</span>
        </SettingsLabel>
      </div>
      <GridContainer>
        {Array.from({ length: 12 }, (_, index) => (
          <GridColumn
            key={index}
            isSelected={index < selectedColumns}
            onClick={() => handleColumnClick(index)}
          />
        ))}
      </GridContainer>
    </ColumnsContainer>
  );
};

export default Columns;
