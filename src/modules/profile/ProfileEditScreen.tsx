import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../profile/css/profileEdit.css';
import Button from '../../ui/Button';
import defaultAvatar from '../../images/Person.png';

export const ProfileEditScreen = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    jerseyNumber: '',
    avatarUrl: '',
  });

  const [initialData, setInitialData] = useState(formData);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localData = localStorage.getItem('user');
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        setFormData(parsed);
        setInitialData(parsed);
      } catch (e) {
        console.error('Ошибка при чтении данных из localStorage:', e);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          avatarUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify(formData));
    navigate('/profile');
  };

  const handleCancel = () => {
    setFormData(initialData);
    navigate('/profile');
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container">
      <h2 className="profile-data">Личные данные</h2>

      <div className="avatar-section">
        <div className="avatar-wrapper">
          <img src={formData.avatarUrl || defaultAvatar} alt="avatar" className="avatar" />
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleAvatarUpload}
        />
        <button type="button" className="load-button" onClick={triggerFileInput}>
          Загрузить аватар
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="firstName">Имя</label>
        <input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Фамилия</label>
        <input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="birthDate">Дата рождения</label>
        <input id="birthDate" name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} />
      </div>

      <div className="form-group last">
        <label htmlFor="jerseyNumber">Номер на форме</label>
        <input id="jerseyNumber" name="jerseyNumber" value={formData.jerseyNumber} onChange={handleChange} />
      </div>

      <Button type="submit" className="save-btn" onClick={handleSubmit}>
        Сохранить изменения
      </Button>
      <button className="cancel-button" onClick={handleCancel}>
        Отменить
      </button>
    </div>
  );
};