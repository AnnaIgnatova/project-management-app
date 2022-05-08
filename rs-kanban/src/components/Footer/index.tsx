import './style.scss';
import rssImg from '../../assets/image/rs_school_js.svg';

const AccountsDevelopers = ['manol1', 'annaignatova', 'lost-fox'];

export const Footer: React.FC = () => {
  return (
    <div className="container-footer">
      <div className="rss">
        <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
          <img className="rss-img" src={rssImg} alt="rss course" />
        </a>
      </div>
      <div className="github">
        {AccountsDevelopers.map((account) => {
          return (
            <a
              className="github-account"
              href={`https://github.com/${account}`}
              target="_blank"
              rel="noreferrer"
              key={account}
            >
              {account}
            </a>
          );
        })}
      </div>
      <div className="year">2022</div>
    </div>
  );
};
