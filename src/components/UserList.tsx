import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchUsers, setCurrentPage, deleteUser } from '../slices/userSlice';
import type { RootState } from '../store';
import type { User } from '../types/user';
import { Link } from 'react-router-dom';
import './UserList.scss';
import { useDebounce } from '../hooks/useDebounce';

export const UsersList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, error, currentPage, loading, total } = useAppSelector((state: RootState) => state.users);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const ITEMS_PER_PAGE = 3;

    useEffect(() => {
        dispatch(fetchUsers({
            page: currentPage,
            limit: ITEMS_PER_PAGE,
            search: debouncedSearchTerm
        }));
    }, [dispatch, currentPage, debouncedSearchTerm]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        dispatch(setCurrentPage(1));
    };

    const handlePageChange = (newPage: number) => {
        dispatch(setCurrentPage(newPage));
    };

    if (error) {
        return (
            <div className="error-container">
                <h2>Oops! Bir sorun oluştu.</h2>
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Tekrar Dene</button>
            </div>
        );
    }

    return (
        <div className="users-container">
            {loading && <div className="loading-overlay"><div className="bar"></div></div>}

            <div className="list-header">
                <h1>Kullanıcı Listesi</h1>
                <Link to="/user/create" className="create-btn">
                    + Yeni Kullanıcı
                </Link>
            </div>

            <div className="search-wrapper">
                <input
                    type="text"
                    className="search-input"
                    placeholder="İsim veya kullanıcı adı ile ara..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            {items.length === 0 && !loading ? (
                <div className="no-data">Gösterilecek kullanıcı bulunamadı.</div>
            ) : (
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>İsim</th>
                            <th>Email</th>
                            <th>Kullanıcı Adı</th>
                            <th style={{ textAlign: 'center' }}>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((user: User) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.username}</td>
                                <td className="actions">
                                    <Link to={`/user/${user.id}`} className="detail-link">
                                        Detay
                                    </Link>
                                    <button
                                        className="delete-btn"
                                        onClick={() => {
                                            if (window.confirm(`${user.name} silinecek. Emin misiniz?`)) {
                                                dispatch(deleteUser(user.id));
                                            }
                                        }}
                                    >
                                        Sil
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div className="pagination-controls">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                >
                    Önceki
                </button>

                <span className="page-info">
                    Sayfa: <strong>{currentPage}</strong> / {Math.ceil(total / ITEMS_PER_PAGE)}
                </span>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= Math.ceil(total / ITEMS_PER_PAGE) || loading}
                >
                    Sonraki
                </button>
            </div>
        </div>
    );
};