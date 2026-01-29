import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import type { RootState } from '../store';
import { fetchUserById } from '../slices/userSlice';
import './UserDetail.scss';

export const UserDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { selectedUser, loading, error } = useAppSelector((state: RootState) => state.users);

    useEffect(() => {
        if (id) {
            dispatch(fetchUserById(Number(id)));
        }
    }, [dispatch, id]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Kullanıcı bilgileri getiriliyor...</p>
            </div>
        );
    }

    if (error || !selectedUser) {
        return (
            <div className="error-container">
                <h2>Biri burada yok gibi...</h2>
                <p>{error || 'Kullanıcı bulunamadı.'}</p>
                <button onClick={() => navigate('/')}>Listeye Dön</button>
            </div>
        );
    }

    return (
        <div className="user-detail-container">
            <button className="back-btn" onClick={() => navigate(-1)}>
                ← Geri Dön
            </button>

            <h1>{selectedUser.name}</h1>
            <span className="username-badge">@{selectedUser.username}</span>

            <div className="detail-card">
                <div className="info-item">
                    <span className="label">E-posta</span>
                    <span className="value">{selectedUser.email}</span>
                </div>
                <div className="info-item">
                    <span className="label">Telefon</span>
                    <span className="value">{selectedUser.phone || 'Girilmemiş'}</span>
                </div>
                <div className="info-item">
                    <span className="label">Web Sitesi</span>
                    <span className="value">{selectedUser.website || 'Girilmemiş'}</span>
                </div>
                {selectedUser.company && (
                    <div className="info-item">
                        <span className="label">Şirket</span>
                        <span className="value">{selectedUser.company.name}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
