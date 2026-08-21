import { useTranslation } from "react-i18next";

const LanguageSelector = () => {

    const { i18n } = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);

        localStorage.setItem(
            "language",
            language
        );
    };

    return (
        <div className="language-selector">

            <button
                onClick={() => changeLanguage("en")}
            >
                English
            </button>

            <button
                onClick={() => changeLanguage("te")}
            >
                తెలుగు
            </button>

        </div>
    );
};

export default LanguageSelector;