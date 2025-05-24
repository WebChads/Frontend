import { NavLink } from "react-router-dom";
import trophyIcon from '../images/Trophy.png';
import calendarIcon from '../images/Calendar.png';
import userIcon from '../images/User.png';
import documentIcon from '../images/Block Chain.png';

export const Footer = () => {
  return (
    <footer className="footer">
      <NavLink to="/tournament" className="footer-link">
        <div className="footer-item">
          <img src={trophyIcon} alt="турниры" className="footer-icon" />
          <span className="footer-label">Турниры</span>
        </div>
      </NavLink>
      <NavLink to="/schedule" className="footer-link">
        <div className="footer-item">
          <img src={calendarIcon} alt="расписание" className="footer-icon" />
          <span className="footer-label">Расписание</span>
        </div>
      </NavLink>
      <NavLink to="/documents" className="footer-link">
        <div className="footer-item">
          <img src={documentIcon} alt="документы" className="footer-icon" />
          <span className="footer-label">Документы</span>
        </div>
      </NavLink>
      <NavLink to="/profile" className="footer-link">
        <div className="footer-item">
          <img src={userIcon} alt="профиль" className="footer-icon" />
          <span className="footer-label">Профиль</span>
        </div>
      </NavLink>
    </footer>
  );
};

