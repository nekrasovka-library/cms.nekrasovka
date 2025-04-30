import React from "react";
import {
  Container1,
  Main,
  Header,
  HeaderButtons,
  HeaderButtonSave,
  HeaderButtonSaveAndExit,
} from "./settings.styles.js";
import { useDispatch, useSelector } from "react-redux";

const Settings = () => {
  const dispatch = useDispatch();
  const { isSettingsOpen } = useSelector((state) => state.settings);

  const handleSave = () => {
    dispatch({ type: "SAVE_SETTINGS" });
  };

  const handleSaveAndExit = () => {
    dispatch({ type: "TOGGLE_SETTINGS" });
  };

  return (
    <Container1 $isMenuOpen={isSettingsOpen}>
      <Header>
        <HeaderButtons>
          <HeaderButtonSave type="button" onClick={handleSave}>
            Сохранить
          </HeaderButtonSave>
          <HeaderButtonSaveAndExit type="button" onClick={handleSaveAndExit}>
            Сохранить и закрыть
          </HeaderButtonSaveAndExit>
        </HeaderButtons>
      </Header>
      <Main>
        <div>
          <label>
            Отступ сверху
            <button
              type="button"
              aria-label="Нажмите, чтобы задать значение для мобильного (<=480px)"
            ></button>
          </label>
          <div>
            <select name="margintop">
              <option value="">Не задан</option>
              <option value="0px">0</option>
              <option value="15px">0.5 line (15px)</option>
              <option value="30px" selected="">
                1 line (30px)
              </option>
              <option value="45px">1.5 line (45px)</option>
              <option value="60px">2 line (60px)</option>
              <option value="75px">2.5 line (75px)</option>
              <option value="90px">3 line (90px)</option>
              <option value="105px">3.5 line (105px)</option>
              <option value="120px">4 line (120px)</option>
              <option value="135px">4.5 line (135px)</option>
              <option value="150px">5 line (150px)</option>
              <option value="165px">5.5 line (165px)</option>
              <option value="180px">6 line (180px)</option>
              <option value="195px">6.5 line (195px)</option>
              <option value="210px">7 line (210px)</option>
            </select>
          </div>
        </div>
        <div>
          <label>
            Отступ снизу
            <button
              type="button"
              aria-label="Нажмите, чтобы задать значение для мобильного (<=480px)"
            ></button>
          </label>
          <div>
            <select name="marginbottom">
              <option value="">Не задан</option>
              <option value="0px">0</option>
              <option value="15px">0.5 line (15px)</option>
              <option value="30px" selected="">
                1 line (30px)
              </option>
              <option value="45px">1.5 line (45px)</option>
              <option value="60px">2 line (60px)</option>
              <option value="75px">2.5 line (75px)</option>
              <option value="90px">3 line (90px)</option>
              <option value="105px">3.5 line (105px)</option>
              <option value="120px">4 line (120px)</option>
              <option value="135px">4.5 line (135px)</option>
              <option value="150px">5 line (150px)</option>
              <option value="165px">5.5 line (165px)</option>
              <option value="180px">6 line (180px)</option>
              <option value="195px">6.5 line (195px)</option>
              <option value="210px">7 line (210px)</option>
            </select>
          </div>
        </div>
      </Main>
    </Container1>
  );
};

export default Settings;
