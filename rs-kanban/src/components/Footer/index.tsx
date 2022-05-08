import './style.scss';
import rssImg from '../../assets/image/rs_school_js.svg';

export const Footer: React.FC = () => {
  return (
    <div className="container-footer">
      <div className="rss">
        <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
          <img className="rss-img" src={rssImg} alt="rss course" />
        </a>
      </div>
      <div className="github">
        <a
          className="github-account"
          href="https://github.com/manol1"
          target="_blank"
          rel="noreferrer"
        >
          manol1
        </a>
        <a
          className="github-account"
          href="https://github.com/annaignatova"
          target="_blank"
          rel="noreferrer"
        >
          AnnaIgnatova
        </a>
        <a
          className="github-account"
          href="https://github.com/lost-fox"
          target="_blank"
          rel="noreferrer"
        >
          lost-fox
        </a>
      </div>
      <div className="year">2022</div>
    </div>
  );
};
