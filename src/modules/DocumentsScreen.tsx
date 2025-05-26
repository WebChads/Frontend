import React, { useState } from 'react';
import Button from '../ui/Button';
import { Footer } from '../ui/Footer';
import './documents.css';

export const DocumentsScreen = () => {
  const [identityDoc, setIdentityDoc] = useState<File | null>(null);
  const [medicalDoc, setMedicalDoc] = useState<File | null>(null);
  const [consentDoc, setConsentDoc] = useState<File | null>(null);
  const [rankDoc, setRankDoc] = useState<File | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setter(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Загруженные документы:', {
      identityDoc,
      medicalDoc,
      consentDoc,
      rankDoc,
    });
    // TODO: Добавить отправку файлов на сервер
  };

  const renderUploadField = (
    label: string,
    hint: string | null,
    file: File | null,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => (
    <div className="document-block">
      <label className="document-label">{label}</label>
      <div className="upload-wrapper">
        <label className="upload-button">
          <span className="plus-icon">+</span> Загрузить
          <input
            type="file"
            onChange={onChange}
            style={{ display: 'none' }}
          />
        </label>
        {file && <span className="file-name">{file.name}</span>}
      </div>
      {hint && <p className="hint">{hint}</p>}
    </div>
  );

  return (
    <>
      <form className="documents-container" onSubmit={handleSubmit}>
        <h1 className="documents-title">Документы</h1>

        {renderUploadField(
          'Удостоверение личности',
          'Паспорт или свидетельство о рождении',
          identityDoc,
          (e) => handleFileChange(e, setIdentityDoc)
        )}

        {renderUploadField(
          'Медицинское заключение',
          null,
          medicalDoc,
          (e) => handleFileChange(e, setMedicalDoc)
        )}

        {renderUploadField(
          'Согласие на обработку персональных данных',
          null,
          consentDoc,
          (e) => handleFileChange(e, setConsentDoc)
        )}

        {renderUploadField(
          'Документ, подтверждающий разряд',
          'Рязрядное удостоверение или классификационная книжка',
          rankDoc,
          (e) => handleFileChange(e, setRankDoc)
        )}

        <Button type="submit" className="save-btn">
          Сохранить изменения
        </Button>
      </form>
      <Footer />
    </>
  );
};