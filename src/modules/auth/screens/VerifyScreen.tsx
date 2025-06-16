import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../ui/Button';
import Input from '../../../ui/Input';
import { IVerifySMSCodeCredentials } from '../../../api/services/authService/credentials/IVerifySMSCodeCredentials';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';

export const VerifyScreen = () => {
  const location = useLocation();
  const phone = location.state?.phone;
  const navigate = useNavigate();
  const auth = useAuth();
  const { register, handleSubmit } = useForm<IVerifySMSCodeCredentials>({
    defaultValues: {
      phone_number: phone 
    }
  });

  const onSubmit = async (credentials: IVerifySMSCodeCredentials) => {
    console.log(credentials)
    await auth.login(credentials);
    navigate('/profile');
  }

  return (
    <>
    <header className='main-header'>
    </header>
      <form onSubmit={handleSubmit(onSubmit)} className='auth-form'>
        <h1 className='auth-header'>Авторизация</h1>
        <p className='tel-number'>Подтвердите номер телефона</p>
        <p className='sms-message'>Мы выслали код подтверждения на ваше устройство</p>
        <input
          {...register("sms_code")}
          type="text"
          placeholder="Код из СМС"
          className="input-field"
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