import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './index.css';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { t, i18n } = useTranslation();

  const menuItems = [
    {
      key: 'home',
      path: '/',
      icon: '🏠',
    },
    {
      key: 'discussions',
      path: '/discussions',
      icon: '💬',
    },
    {
      key: 'grampanchayat',
      path: '/grampanchayat',
      icon: '🏛️',
    },
    {
      key: 'issues',
      path: '/issues',
      icon: '⚠️',
    },
    {
      key: 'profile',
      path: '/profile',
      icon: '👤',
    },
  ];

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="menu">
      <div className="menu-container">

        {/* Logo */}
        <NavLink
          to="/"
          className="menu-logo"
          onClick={closeMenu}
        >
          <div className="logo-icon">
            🌱
          </div>

          <div className="logo-text">
            <span className="logo-title">
              MyVillage
            </span>

            <span className="logo-subtitle">
              {t('app.tagline')}
            </span>
          </div>
        </NavLink>

        {/* Navigation */}
        <div className={`menu-links ${isOpen ? 'menu-links-open' : ''}`}>
          {menuItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                `menu-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="menu-icon">
                {item.icon}
              </span>

              <span>
                {t(`menu.${item.key}`)}
              </span>
            </NavLink>
          ))}

          {/* Language selector */}
          <div className="language-selector">
            <span className="language-icon">
              🌐
            </span>

            <select
              value={i18n.language}
              onChange={changeLanguage}
              aria-label={t('menu.language')}
            >
              {Object.keys(i18n.options.resources || {}).map((language) => (
                <option key={language} value={language}>
                  {language.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile button */}
        <button
          type="button"
          className={`menu-toggle ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={t('menu.toggle')}
          aria-expanded={isOpen}
        >
          <span />
          <span />
          <span />
        </button>

      </div>
    </nav>
  );
};

export default Menu;