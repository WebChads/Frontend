import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../ui/Input';
import Button from '../../../ui/Button';
import '../styles/style.css';


export const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userPhone', phone);
    navigate('/register'); 
  };

  return (
    <>
    <header className='main-header'>
    </header>
    <form onSubmit={handleSubmit} className='auth-form'>
        <h1 className='auth-header'>Авторизация</h1>
        <p className='tel-number'>Введите номер телефона</p>
      <Input
        type="tel"
        placeholder="телефон"
        value={phone}
        className="input-field"
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button type="submit" className='confirm-btn'>Подтвердить</Button>
    </form>
    </>
  );
};