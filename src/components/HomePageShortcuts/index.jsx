import './index.css'
const HomePageShortcuts = ({ name, icon, text, onGoToPage }) => {
    const goToPage = () => {
        onGoToPage(name);
    }
    return (
        <button className="home-shortcut-item" onClick={goToPage}>
            {icon}
            <span className="shortcut-name">{name}</span>
            <span className="shortcut-text">{text}</span>
        </button>
    )

}
export default HomePageShortcuts