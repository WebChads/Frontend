import { useState } from 'react';
import '../tournaments/css/tournaments.css';
import { Footer } from '../../ui/Footer';
import filterIcon from '../../images/filter.png';
import searchIcon from '../../images/Search.png';
import arrowIcon from '../../images/arrow.png';

const mockTournaments = [
    {
        id: 1,
        date: '2025-05-29',
        title: 'Кубок сигмабоев',
        judge: 'Алексеев Александр Вячеславович',
    },
    {
        id: 2,
        date: '2025-06-17',
        title: 'Турнир за зачет по ПП',
        judge: 'Шадрин Денис Борисович',
    },
    {
        id: 3,
        date: '1242-04-05',
        title: 'Ледовое побоище',
        judge: 'Александр Невский',
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

    return (
        <>
            <div className="tournaments-container">
                <div className="tabs">
                    <button className={selectedTab === 'search' ? 'active' : ''} onClick={() => setSelectedTab('search')}>Поиск {mockTournaments.length}</button>
                    <button className={selectedTab === 'requests' ? 'active' : ''} onClick={() => setSelectedTab('requests')}>Заявки </button>
                    <button className={selectedTab === 'past' ? 'active' : ''} onClick={() => setSelectedTab('past')}>Прошедшие</button>
                </div>

                <div className="search-bar">
                    <input type="text" placeholder="Поиск" />
                    <img src={searchIcon} className="search-icon" />
                    <img src={filterIcon} className="filter-icon" />
                </div>

                <h2 className="section-title">Турниры</h2>

                <div className="tournament-list">
                    {mockTournaments.map((tournament) => {
                        const dateClass = getDateClass(tournament.date);
                        return (
                            <div className="tournament-card" key={tournament.id}>
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

                <div className="upcoming-banner">
                    <div className="upcoming-left">
                        <div className="upcoming-header">
                            <div className="status-circle upcoming"></div>
                            <div className="tournament-label">Ближайший турнир</div>
                        </div>
                        <div className="upcoming-title">Кубок сигмабоев</div>
                        <div className="upcoming-date">29.05.2025</div>
                    </div>
                    <img src={arrowIcon} className="arrow-icon" />
                </div>
            </div>

            <Footer />
        </>
    );
};