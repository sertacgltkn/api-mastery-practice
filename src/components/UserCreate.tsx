import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../hooks/useRedux';
import { createUser } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './UserCreate.scss';

export const UserCreate: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, 'İsim en az 3 karakter olmalıdır')
            .required('İsim zorunlu'),
        email: Yup.string()
            .email('Geçersiz email adresi')
            .required('Email zorunlu'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await dispatch(createUser({
                    ...values,
                    username: values.name.toLowerCase().replace(/\s/g, '_'),
                    phone: '',
                    website: ''
                })).unwrap();

                toast.success('Kullanıcı başarıyla oluşturuldu!');
                navigate('/');
            } catch (error) {
                toast.error('Kullanıcı oluşturulurken bir hata oluştu.');
                console.error("Form gönderim hatası:", error);
            }
        }
    });

    return (
        <div className="user-create-container">
            <h1>Yeni Kullanıcı Ekle</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">İsim Soyisim</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Örn: Ahmet Yılmaz"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.name && formik.errors.name ? 'error' : ''}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className="error-text">{formik.errors.name}</div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="email">E-posta Adresi</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Örn: ahmet@example.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.email && formik.errors.email ? 'error' : ''}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="error-text">{formik.errors.email}</div>
                    )}
                </div>

                <div className="button-group">
                    <button
                        type="button"
                        className="back-btn"
                        onClick={() => navigate('/')}
                    >
                        Vazgeç
                    </button>
                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={formik.isSubmitting || !formik.isValid}
                    >
                        {formik.isSubmitting ? 'Kaydediliyor...' : 'Kullanıcıyı Kaydet'}
                    </button>
                </div>
            </form>
        </div>
    );
};
