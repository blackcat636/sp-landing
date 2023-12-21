export default defineI18nConfig(() => ({
    legacy: false,
    defaultLocale: 'fr',
    lazy: false,
    locales: [
        {
            code: 'fr',
            file: 'fr-FR.js'
        },
        {
            code: 'en',
            file: 'en-US.js'
        },
        {
            code: 'uk',
            file: 'uk-UA.js'
        },
        {
            code: 'ru',
            file: 'ru-RU.js'
        }
    ],
    // langDir: 'lang/',
    // detectBrowserLanguage: {
    //     useCookie: true,
    //     cookieKey: 'i18n_redirected',
    //     alwaysRedirect: true,
    //     cookieCrossOrigin: true,
    //     redirectOn: 'root',  // recommended
    // },
    // messages: {
    //     en: {
    //         welcome: 'Welcome {name}'
    //     },
    //     fr: {
    //         welcome: 'Bienvenue {name}'
    //     },
    //     ru: {
    //         welcome: ' {name} Привет'
    //     },
    //     uk: {
    //         welcome: 'Привіт {name}'
    //     }
    // }
}))
