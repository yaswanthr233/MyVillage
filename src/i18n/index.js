import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en";
import te from "./te";

const savedLanguage =
    localStorage.getItem("language") || "te";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en,
            te
        },

        lng: savedLanguage,

        fallbackLng: "te",

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;