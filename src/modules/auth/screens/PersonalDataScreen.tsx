import { useEffect, useState } from 'react';
import Button from '../../../ui/Button';
import Input from '../../../ui/Input';
import { ToggleSelector } from '../../../ui/ToggleSelector';
import { useNavigate } from 'react-router-dom';

export const PersonalDataScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setFirstName(parsed.firstName || '');
        setLastName(parsed.lastName || '');
        setBirthDate(parsed.birthDate || '');
        setGender(parsed.gender || 'male');
      } catch (e) {
        console.error('Ошибка при чтении user из localStorage', e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      firstName,
      lastName,
      birthDate,
      gender
    };

    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/profile');
  };

  return (
    <>
      <header className='personalData-header'></header>
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="auth-header">Заполните личные данные</h1>

        <label className="personal-data">Имя</label>
        <Input
          type="text"
          placeholder="Иван"
          value={firstName}
          className="input-field"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="personal-data">Фамилия</label>
        <Input
          type="text"
          placeholder="Иванов"
          value={lastName}
          className="input-field"
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="personal-data">Дата рождения</label>
        <Input
          type="date"
          value={birthDate}
          className="input-field"
          onChange={(e) => setBirthDate(e.target.value)}
        />

        <label className="gender">Пол</label>
        <ToggleSelector
          options={[
            { value: 'male', label: 'Мужской' },
            { value: 'female', label: 'Женский' }
          ]}
          selected={gender}
          onSelect={setGender}
        />

        <Button type="submit" className="confirm-btn">
          Подтвердить
        </Button>

        <p className="skip-btn" onClick={() => navigate('/register')}>Пропустить</p>
      </form>
    </>
  );
};