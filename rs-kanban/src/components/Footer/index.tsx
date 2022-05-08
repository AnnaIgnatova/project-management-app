import './style.scss';
import rssImg from '../../assets/image/rs_school_js.svg';

const Github = [
  'https://github.com/manol1',
  'https://github.com/annaignatova',
  'https://github.com/lost-fox',
];

export const Footer: React.FC = () => {
  return (
    <div className="container-footer">
      <div className="rss">
        <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
          <img className="rss-img" src={rssImg} alt="rss course" />
        </a>
      </div>
      <div className="github">
        {Github.map((account) => {
          return (
            <a
              className="github-account"
              href={account}
              target="_blank"
              rel="noreferrer"
              key={account}
            >
              {account.slice(account.lastIndexOf('/') + 1)}
            </a>
          );
        })}
      </div>
      <div className="year">2022</div>
    </div>
  );
};
