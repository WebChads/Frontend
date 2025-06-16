import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../ui/Input';
import Button from '../../../ui/Button';
import '../styles/style.css';
import { api } from '../../../api/ApiInstance';
import { useForm } from 'react-hook-form';
import { ISendSMSCodeCredentials } from '../../../api/services/authService/credentials/ISendSMSCodeCredentials';

export const LoginScreen = () => {
   const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISendSMSCodeCredentials>();

  const navigate = useNavigate();

  const onSubmit = async (credentials: ISendSMSCodeCredentials) => {
    await api.auth.sendSMSCode(credentials);
    navigate('/verify', { state: { phone: credentials.phone_number } });
  }

  return (
    <>
    <header className='main-header'>
    </header>
    <form onSubmit={handleSubmit(onSubmit)} className='auth-form'>
        <h1 className='auth-header'>Авторизация</h1>
        <p className='tel-number'>Введите номер телефона</p>
      <Input
        {...register('phone_number', {
          required: 'Телефон обязателен',
          pattern: {
            value: /^\+7\d{10}$/,
            message: 'Формат: +79991234567'
          }
        })}
        type="tel"
        placeholder="+79991234567"
        className="input-field"
      />
      <Button type="submit" className='confirm-btn'>Подтвердить</Button>
    </form>
    </>
  );
};