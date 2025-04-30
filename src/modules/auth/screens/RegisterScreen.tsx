import { useState } from "react";
import Button from "../../../ui/Button";
import { ToggleSelector } from "../../../ui/ToggleSelector";
import { useNavigate } from "react-router-dom";


export const RegisterScreen = () => {
    const [role, setRole] = useState<'coach' | 'player'>('coach');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/personalData');
      };

    return (
        <>
        <header className="main-header">
        </header>
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
        <p className='back-btn' onClick={() => navigate('/verify')}>
          Назад
        </p>
        </div>
        </>
    )
}