import { useParams, useNavigate } from 'react-router-dom';
import { useRequests} from '../tournaments/requestContext';
import arrowIcon from '../../images/arrow.png';
import avatar from '../../images/Avatar.png';
import '../tournaments/css/tournaments.css';
import { Footer } from '../../ui/Footer';
import { mockTournaments } from './TournamentsScreen';

const mockParticipants = [
  { id: 1, name: 'Иван Иванов', age: 24, tournamentId: 1 },
  { id: 2, name: 'IVан Иванов', age: 25, tournamentId: 1 },
  { id: 3, name: 'ИваН ИАнов', age: 26, tournamentId: 2 },
  { id: 4, name: 'Иван ИвaноV', age: 27, tournamentId: 2 },
];

export const TournamentDetailsScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addRequest, requests } = useRequests(); 
  const tournamentId = Number(id);

  const hasAlreadyApplied = requests.some(
    r => r.tournamentId === tournamentId
  );

  const tournament = mockTournaments.find(t => t.id === tournamentId);
  if (!tournament) return <div style={{ padding: '20px' }}>Турнир не найден</div>;

  const participants = mockParticipants.filter(p => p.tournamentId === tournamentId);

  const handleApply = () => {
    if (!hasAlreadyApplied) {
      addRequest(tournamentId);
    }
  };

  return (
    <div className="tournament-details">
      <button onClick={() => navigate(-1)} className="back-button">
        <img src={arrowIcon} alt="Назад" style={{ width: '24px', transform: 'rotate(180deg)' }} />
      </button>

      <h1 className="details-title">{tournament.title}</h1>

      <div className="details-info">
        <div className="date-chip">{new Date(tournament.date).toLocaleDateString('ru-RU')}</div>
        <div className="matches-chip">{tournament.matches} микроматчей</div>
      </div>
      <p className="judge">Судья: {tournament.judge}</p>

      <button
        className="apply-button"
        disabled={hasAlreadyApplied}
        onClick={handleApply}
      >
        {hasAlreadyApplied ? 'Вы уже подали заявку' : 'Подать заявку'}
      </button>

      <div className="participants-section">
        <h3 className="participants-title">Участники</h3>
        {participants.length > 0 ? (
          <ul className="participant-list">
            {participants.map(p => (
              <li className="participant-card" key={p.id}>
                <img src={avatar} alt="avatar" className="participant-avatar" />
                <div className="participant-info">
                  <div className="participant-name">{p.name}</div>
                  <div className="participant-age">{p.age} лет</div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="participants-notfound">Пока нет зарегистрированных участников</p>
        )}
      </div>
      <Footer />
    </div>
  );
};