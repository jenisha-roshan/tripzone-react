import "./HeaderLink.scss";

function HeaderLink(props) {
  return (
    <li className="header-link">
      <p className="header-small-text">{props.text}</p>
      <p className="header-time-text">{props.time}</p>
    </li>
  );
}

export default HeaderLink;
