import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import '../tournaments/css/tournaments.css';

const FILTER_STORAGE_KEY = 'tournaments_filters';

export const TournamentsFilterScreen = () => {
  // При инициализации пытаемся загрузить из localStorage
  const savedFilters = JSON.parse(localStorage.getItem(FILTER_STORAGE_KEY) || '{}');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>(savedFilters.sortOrder || 'newest');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'past'>(savedFilters.statusFilter || 'all');

  const navigate = useNavigate();

  // Сохраняем фильтры в localStorage при их изменении
  useEffect(() => {
    localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify({ sortOrder, statusFilter }));
  }, [sortOrder, statusFilter]);

  const applyFilter = () => {
    navigate(`/tournaments?sort=${sortOrder}&status=${statusFilter}`);
  };

  return (
    <div className="filter-screen">
      <div className="filter-container">
        <h2 className="filter-header">Сортировка по дате</h2>
        <div className="filter-items">
          <button
            className={`filter-btn ${sortOrder === 'newest' ? 'active' : ''}`}
            onClick={() => setSortOrder('newest')}
            type="button"
          >
            Сначала новые
          </button>
          <button
            className={`filter-btn ${sortOrder === 'oldest' ? 'active' : ''}`}
            onClick={() => setSortOrder('oldest')}
            type="button"
          >
            Сначала старые
          </button>
        </div>
      </div>

      <div className="filter-container">
        <h2 className="filter-header">Статус</h2>
        <div className="filter-items">
          <button
            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
            type="button"
          >
            Все
          </button>
          <button
            className={`filter-btn ${statusFilter === 'upcoming' ? 'active' : ''}`}
            onClick={() => setStatusFilter('upcoming')}
            type="button"
          >
            Предстоящие
          </button>
          <button
            className={`filter-btn ${statusFilter === 'past' ? 'active' : ''}`}
            onClick={() => setStatusFilter('past')}
            type="button"
          >
            Завершённые
          </button>
        </div>
      </div>

      <Button className="confirm-btn confirm-btn2" onClick={applyFilter}>
        Применить фильтры
      </Button>
    </div>
  );
};