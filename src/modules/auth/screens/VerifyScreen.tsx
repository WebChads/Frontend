import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../ui/Button';
import Input from '../../../ui/Input';

export const VerifyScreen = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/register')
  };

  return (
    <>
    <header className='main-header'>
    </header>
      <form onSubmit={handleSubmit} className='auth-form'>
        <h1 className='auth-header'>Авторизация</h1>
        <p className='tel-number'>Подтвердите номер телефона</p>
        <p className='sms-message'>Мы выслали код подтверждения на ваше устройство</p>
        <Input
          type="text"
          placeholder="Код из СМС"
          value={code}
          className="input-field"
          onChange={(e) => setCode(e.target.value)}
        />
        <Button type="submit" className='confirm-btn'>Подтвердить</Button>
      </form>

      <div>
        <p className='back-btn' onClick={() => navigate('/')}>
          Назад
        </p>
      </div>
    </>
  );
};