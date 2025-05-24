import { Footer } from "../../ui/Footer";
import avatarIcon from "../../images/Avatar.png";
import starIcon from "../../images/Star.png";
import '../profile/css/profile.css';
import medalIcon from '../../images/Medal.png';

export const ProfileScreen = () => {
  return (
    <>
    <header className='main-header'>
    </header>
    <div style={{ paddingBottom: '80px' }}>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <img
          src={avatarIcon}
          alt="Avatar"
        />
        <h2>Иван Иванов</h2>
        <p className="age">24 года</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <div className="tag">
            <img src={starIcon} />
             <p className="profile-atr">2200 Рейтинг</p>
          </div>
          <div className="tag">
            <img src={medalIcon} />
             <p className="profile-atr">КМС разряд</p>
          </div>
        </div>

        <button className="btn">Редактировать профиль</button>
      </div>

      <Footer />
    </div>
    </>
  );
};