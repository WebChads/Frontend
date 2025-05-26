import { Footer } from "../../ui/Footer";
import starIcon from "../../images/Star.png";
import medalIcon from '../../images/Medal.png';
import '../profile/css/profile.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import defaultAvatar from "../../images/Person.png"; // или avatarIcon, если хочешь

export const ProfileScreen = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(() => {
    const local = localStorage.getItem('user');
    return local ? JSON.parse(local) : {};
  });

  useEffect(() => {
    const updateUser = () => {
      const local = localStorage.getItem('user');
      setUserData(local ? JSON.parse(local) : {});
    };

    // Слушаем изменения при возврате со страницы редактирования
    window.addEventListener('focus', updateUser);

    return () => {
      window.removeEventListener('focus', updateUser);
    };
  }, []);

  const fullName = `${userData.firstName || 'Имя'} ${userData.lastName || 'Фамилия'}`;

  const getAge = (birthDateStr: string) => {
    const birthDate = new Date(birthDateStr);
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const age = userData.birthDate ? getAge(userData.birthDate) + ' года' : '—';

  return (
    <>
      <header className='main-header' />
      <div style={{ paddingBottom: '80px' }}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <img
            src={userData.avatarUrl || defaultAvatar}
            alt="Avatar"
            className="avatar-large"
          />
          <h2>{fullName}</h2>
          <p className="age">{age}</p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <div className="tag">
              <img src={starIcon} />
              <p className="profile-atr">2200 Рейтинг</p>
            </div>
            <div className="tag">
              <img src={medalIcon} />
              <p className="profile-atr">-----</p>
            </div>
          </div>

          <button className="btn" onClick={() => navigate('/profile/edit')}>
            Редактировать профиль
          </button>
        </div>

        <Footer />
      </div>
    </>
  );
};