import { useState } from "react";
import Button from "../../../ui/Button";
import { ToggleSelector } from "../../../ui/ToggleSelector";
import { useNavigate } from "react-router-dom";
import { registerUser, generateToken } from "../api/api";

export const RegisterScreen = () => {
  const [role, setRole] = useState<'coach' | 'player'>('coach');
  const navigate = useNavigate();

  const getNextUserId = (): string => {
    // Получаем текущее значение userId из localStorage
    const currentId = localStorage.getItem('userIdCounter');
    let nextId = 1;
    if (currentId) {
      nextId = parseInt(currentId, 10) + 1;
    }
    localStorage.setItem('userIdCounter', nextId.toString());
    return nextId.toString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const phone = localStorage.getItem('userPhone');
    if (!phone) throw new Error('Phone number is missing');

    // Генерируем user_id локально, увеличивая счетчик
    const user_id = getNextUserId();

    // Регистрируем пользователя с phone и role
    await registerUser(phone, role);

    // Генерируем JWT токен, передавая role и user_id
    await generateToken(role, user_id);

    // Переходим к следующему экрану
    navigate('/personalData');
  } catch (error) {
    console.error('Ошибка регистрации или генерации токена:', error);
  }
};

  return (
    <>
      <header className="main-header"></header>
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className='auth-header'>Регистрация</h1>
        <label className="role-selector">Выберите роль</label>
        <ToggleSelector
          options={[
            { value: 'coach', label: 'Тренер' },
            { value: 'player', label: 'Игрок' },
          ]}
          selected={role}
          onSelect={setRole}
        />
        <Button type="submit" className='confirm-btn'>Далее</Button>
      </form>
      <div>
        <p className='back-btn' onClick={() => navigate('/verify')}>Назад</p>
      </div>
    </>
  );
};