// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: {
        strict: true
    },
    loading: '~/components/LoadingBar.vue',
    ssr: true,
    nitro: {
        prerender: {
            crawlLinks: true,
            failOnError: false
        }
    },
    imports: {
        dirs: ['stores']
    },
    app: {
        head: {
            title: 'SP'
        },
        rootId:'__slovo',
        buildAssetsDir:'pcn'
    },

    // build: {
    //     transpile: ['primevue']
    // },
    runtimeConfig: {
        public: {
            BACKEND_URL: process.env.BACKEND_URL
        },
        private: {
            secret: process.env.SECRET,
            BACKEND_URL: process.env.BACKEND_URL,
            BACKEND_NODE_URL: process.env.BACKEND_NODE_URL
        }
    },
    // target: "static",
    // script: [
    //     {
    //         strategy: 'lazyOnload',
    //         src: 'https://www.googletagmanager.com/gtag/js?id=UA-93461466-1'
    //     },
    //     {
    //         id: 'ga-analytics',
    //         strategy: 'lazyOnload',
    //         children: `
    //         window.dataLayer = window.dataLayer || [];
    //         function gtag(){dataLayer.push(arguments);}
    //         gtag('js', new Date());
    //         gtag('config', 'UA-93461466-1');
    //     `
    //     }
    // ],

    // pwa: {
    //     registerType: 'autoUpdate',
    //     // strategies: 'injectManifest',
    //     manifest: {
    //         name: 'SP App',
    //         short_name: 'SP App',
    //         theme_color: '#ffffff',
    //         id: 'cabinet.sp',
    //         description: 'Cabinet for accessing and managing',
    //         display: 'fullscreen',
    //         "orientation": "any",
    //         "categories": [
    //             "business",
    //             "finance"
    //         ],
    //         icons: [
    //             {
    //                 src: 'pwa-64x64.png ',
    //                 sizes: '64x64',
    //                 type: 'image/png'
    //             },
    //             {
    //                 src: 'pwa-192x192.png ',
    //                 sizes: '192x192',
    //                 type: 'image/png'
    //             },
    //             {
    //                 src: 'pwa-512x512.png ',
    //                 sizes: '512x512',
    //                 type: 'image/png'
    //             },
    //             {
    //                 src: 'favicon-512x512.png',
    //                 sizes: '512x512',
    //                 type: 'image/png',
    //                 purpose: 'any'
    //             }
    //         ],
    //         "screenshots": [
    //             {
    //                 "src": "/images/screenshots/screen1.png",
    //                 "sizes": "1280x800",
    //                 "type": "image/png"
    //             },
    //             {
    //                 "src": "/images/screenshots/screen2.png",
    //                 "sizes": "1280x800",
    //                 "type": "image/png"
    //             },
    //         ],
    //         "display_override": [
    //             "fullscreen",
    //             "browser",
    //             "window-controls-overlay",
    //             "minimal-ui",
    //             "standalone"
    //         ]
    //     },
    //     workbox: {
    //         globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    //         sourcemap: true
    //     },
    //     client: {
    //         installPrompt: true,
    //         // you don't need to include this: only for testing purposes
    //         // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
    //         // periodicSyncForUpdates: 20,
    //     },
    //     devOptions: {
    //         enabled: false,
    //         suppressWarnings: true,
    //         navigateFallbackAllowlist: [/^\/$/],
    //         type: 'module',
    //     },
    // },
    i18n: {
        defaultLocale: 'en',
        locales: [
            { code: "en", iso: "en", file: "en.json", flag: "/images/flag/en-flag.svg" },
            { code: "ru", iso: "ru", file: "ru.json", flag: "/images/flag/ru.svg" }
        ],
        // strictMessage: false,
        compilation: {
            strictMessage: false
        },
        precompile: {
            strictMessage: false
        },
        lazy: false,
        langDir: 'lang/',
        strategy: "no_prefix",
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_lang',
            alwaysRedirect: true,
            cookieCrossOrigin: false,
            redirectOn: 'root'  // recommended
        }
        // vueI18n: './i18n.Config.ts'
    },
    veeValidate: {
        // disable or enable auto imports
        autoImports: true,
        // Use different names for components
        componentNames: {
            Form: 'VeeForm',
            Field: 'VeeField',
            FieldArray: 'VeeFieldArray',
            ErrorMessage: 'VeeErrorMessage'
        }
    },
    primevue: {
        usePrimeVue: true,
        options: {},
        importPT: undefined,
        cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
        components: {
            prefix: '',
            name: undefined,
            include: undefined,
            exclude: undefined
        },
        directives: {
            prefix: '',
            name: undefined,
            include: undefined,
            exclude: undefined
        },
        composables: {
            prefix: '',
            name: undefined,
            include: undefined,
            exclude: undefined
        }
    },
    css: ['primeicons/primeicons.css', 'primeflex/primeflex.scss', 'primevue/resources/primevue.min.css', '@/assets/styles.scss'],
    devtools: {
        enabled: true,
        // timeline: {
        //     enabled: true
        // }
    },
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/i18n',
        '@vueuse/nuxt',
        '@nuxt/devtools',
        '@vee-validate/nuxt',
        // '@vite-pwa/nuxt',
        'nuxt-primevue'
    ]
});
