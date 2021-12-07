import { createI18n } from "vue3-i18n";

import qu from "../../locales/qu";
import es from "../../locales/es";

const messages = {
  es,
  qu,
};

const i18n = createI18n({
  locale: "es",
  messages,
});

export default i18n;
