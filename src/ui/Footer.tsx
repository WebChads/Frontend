import { NavLink } from "react-router-dom";
import UserIcon from '../images/User.svg';
import CalendarIcon from '../images/Calendar.svg';
import DocumentsIcon from '../images/Block Chain.svg';
import TrophyIcon from '../images/Trophy.svg';

export const Footer = () => {
  return (
    <footer className="footer">
      <NavLink
        to="/tournaments"
        className={({ isActive }) => 'footer-link' + (isActive ? ' active' : '')}
      >
        <div className="footer-item">
          <div className="footer-icon-wrapper">
            <img src={TrophyIcon} alt="турниры" className="footer-icon" />
          </div>
          <span className="footer-label">Турниры</span>
        </div>
      </NavLink>
      <NavLink
        to="/schedule"
        className={({ isActive }) => 'footer-link' + (isActive ? ' active' : '')}
      >
        <div className="footer-item">
          <div className="footer-icon-wrapper">
            <img src={CalendarIcon} alt="Расписание" className="footer-icon" />
          </div>
          <span className="footer-label">Расписание</span>
        </div>
      </NavLink>
      <NavLink
        to="/documents"
        className={({ isActive }) => 'footer-link' + (isActive ? ' active' : '')}
      >
        <div className="footer-item">
          <div className="footer-icon-wrapper">
            <img src={DocumentsIcon} alt="Документы" className="footer-icon" />
          </div>
          <span className="footer-label">Документы</span>
        </div>
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) => 'footer-link' + (isActive ? ' active' : '')}
      >
        <div className="footer-item">
          <div className="footer-icon-wrapper">
            <img src={UserIcon} alt="профиль" className="footer-icon" />
          </div>
          <span className="footer-label">Профиль</span>
        </div>
      </NavLink>
    </footer>
  );
};

