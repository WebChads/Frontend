/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import '../tournaments/css/tournaments.css';
import { Footer } from '../../ui/Footer';
import filterIcon from '../../images/filter.png';
import searchIcon from '../../images/Search.png';
import arrowIcon from '../../images/arrow.png';
import { useNavigate } from 'react-router-dom';


const mockRequests = [
    {
        id: 1,
        tournamentId: 1,
        status: 'APPROVAL',
    },
    {
        id: 2,
        tournamentId: 2,
        status: 'ACCEPTED',
    },
];

const mockTournaments = [
    {
        id: 1,
        date: '2025-05-29',
        title: 'Кубок сигмабоев',
        judge: 'Алексеев Александр Вячеславович',
        matches: 20
    },
    {
        id: 2,
        date: '2025-06-17',
        title: 'Турнир за зачет по ПП',
        judge: 'Шадрин Денис Борисович',
        matches: 20
    },
    {
        id: 3,
        date: '1242-04-05',
        title: 'Ледовое побоище',
        judge: 'Александр Невский',
        matches: 20
    },
];

function getDateClass(dateString: string): 'past' | 'upcoming' | 'future' {
    const now = new Date();
    const date = new Date(dateString);
    const diff = date.getTime() - now.getTime();
    const dayMs = 24 * 60 * 60 * 1000;

    if (diff < -dayMs) return 'past';
    if (diff <= 2 * dayMs) return 'upcoming';
    return 'future';
}

function getStatusLabel(status: string) {
    switch (status) {
        case 'APPROVAL':
            return 'на рассмотрении';
        case 'ACCEPTED':
            return 'принята';
        case 'CANCELLED':
            return 'отменена';
    }
}

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

export const TournamentsScreen = () => {
    const [selectedTab, setSelectedTab] = useState<'search' | 'requests' | 'past'>('search');
    const [searchTerm, setSearchTerm] = useState('');
    const [requests, setRequests] = useState(mockRequests);

    const handleCancel = (id: number) => {
        setRequests(prev => prev.filter(req => req.id !== id));
    };

    const navigate = useNavigate();
    const getTournamentById = (id: number) => mockTournaments.find(t => t.id === id);

    // 🔍 Вычисление ближайшего турнира
    const now = new Date();
    const upcomingTournament = mockTournaments
        .filter(t => new Date(t.date) >= now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

    return (
        <>
            <div className="tournaments-container">
                <div className="tabs">
                    <button className={selectedTab === 'search' ? 'active' : ''} onClick={() => setSelectedTab('search')}>Поиск {mockTournaments.length}</button>
                    <button className={selectedTab === 'requests' ? 'active' : ''} onClick={() => setSelectedTab('requests')}>Заявки {requests.length}</button>
                    <button className={selectedTab === 'past' ? 'active' : ''} onClick={() => setSelectedTab('past')}>Прошедшие</button>
                </div>
                {selectedTab === 'search' && (
                    <>
                        <div className="search-bar">
                            <div className="search-input-wrapper">
                                <input
                                    type="text"
                                    placeholder="Поиск"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <img src={searchIcon} className="search-icon" />
                            </div>
                            <img src={filterIcon} className="filter-icon" />
                        </div>

                        <h2 className="section-title">Турниры</h2>

                        <div className="tournament-list">
                            {mockTournaments.filter(tournament => {
                                const search = searchTerm.toLowerCase().trim();
                                const words = tournament.title.toLowerCase().split(/\s+/);
                                return words.some(word => word.startsWith(search));
                            }).map((tournament) => {
                                const dateClass = getDateClass(tournament.date);
                                return (
                                    <div className="tournament-card"
                                        key={tournament.id}
                                        onClick={() => navigate(`/tournaments/${tournament.id}`)}>
                                        <div className="tournament-info">
                                            <div className="tournament-line">
                                                <div className={`status-circle ${dateClass}`}></div>
                                                {dateClass === 'upcoming' && (
                                                    <span className="tournament-label"></span>
                                                )}
                                                <span className="tournament-date">{formatDate(tournament.date)}</span>
                                            </div>
                                            <div className="tournament-title">{tournament.title}</div>
                                            <div className="tournament-judge">Судья: {tournament.judge}</div>
                                        </div>
                                        <img src={arrowIcon} className="arrow-icon" />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Ближайший турнир, если есть */}
                        {upcomingTournament ? (
                            <div className="upcoming-banner"
                                onClick={() => navigate(`/tournaments/${upcomingTournament.id}`)}>
                                <div className="upcoming-left">
                                    <div className="upcoming-header">
                                        <div className="status-circle upcoming"></div>
                                        <div className="tournament-label">Ближайший турнир</div>
                                    </div>
                                    <div className="upcoming-title">{upcomingTournament.title}</div>
                                    <div className="upcoming-date">{formatDate(upcomingTournament.date)}</div>
                                </div>
                                <img src={arrowIcon} className="arrow-icon" />
                            </div>
                        ) : (
                            <div className="upcoming-banner empty">
                                <div className="upcoming-left">
                                    <div className="upcoming-header">
                                        <div className="status-circle"></div>
                                        <div className="tournament-label">Ближайший турнир</div>
                                    </div>
                                    <div className="upcoming-title">Нет ближайших турниров</div>
                                </div>
                            </div>
                        )}
                    </>
                )}
                {selectedTab === 'requests' && (
                    <>
                        <h2 className="section-title">Заявки</h2>
                        <div className="requests-list">
                            {requests.length === 0 && <p>Пока нет заявок</p>}
                            {requests.map(request => {
                                const tournament = getTournamentById(request.tournamentId);
                                if (!tournament) return null;

                                let statusClass = '';

                                if (request.status === 'ACCEPTED') {
                                    statusClass = 'accepted'; 
                                } else if (request.status === 'APPROVAL') {
                                    statusClass = 'approval';
                                } else if (request.status === 'CANCELLED') {
                                    statusClass = 'cancelled';
                                }

                                return (
                                    <div key={request.id} className="request-card">
                                        <div className="request-date">{formatDate(tournament.date)}</div>
                                        <div className="request-title">{tournament.title}</div>
                                        <div className="request-judge">Судья: {tournament.judge}</div>
                                        <div className="request-buttons">
                                            <button className={`request-status ${statusClass}`} disabled>
                                                Заявка {getStatusLabel(request.status)}
                                            </button>
                                            <button
                                                className="cancel-button"
                                                onClick={() => handleCancel(request.id)}
                                            >
                                                Отменить заявку
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

                {selectedTab === 'past' && (
                    <>
                        {/* По аналогии сюда можно добавить логику для прошлых турниров */}
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

export { mockTournaments }