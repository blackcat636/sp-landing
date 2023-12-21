import { defineStore } from 'pinia'
import {computed, ref} from 'vue';
import {Config,layoutState} from '@/types/Config';


export const useSettingsStore = defineStore('settings', () => {

    const darkTheme = 'md-dark-indigo';
    const lightTheme = 'md-light-indigo';
    const config  = ref<Config>({
        ripple : false,
        darkTheme: false,
        inputStyle: 'outlined',
        menuMode: 'static',
        theme: darkTheme,
        scale: 14,
        activeMenuItem: null});

    const layoutState = ref<layoutState>({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false
    });

    load_config();

    function load_config() {
        // let res = JSON.parse(localStorage.getItem('config'));
        const res = useCookie('config');

        // console.log(res.value);
        if(res.value){
            config.value = res;
        }
    }
    async function save_config() {
        // localStorage.setItem('config', JSON.stringify(config.value));
        const settingsCookie = useCookie('config');
        settingsCookie.value = JSON.stringify(config.value);
    }

    function changeThemeSettingsTest (theme)  {
        config.value.theme = theme;
        save_config();
    }
    function getThemeMode(){
        if(config.value.theme===darkTheme){
            return 'dark';
        }
        return 'light';
    }
    const isDark = computed(()=>{
        if(config.value.theme===darkTheme){
            return true;
        }
        return false;
    })
    function switchTheme ()  {
        if(config.value.theme===darkTheme){
            changeThemeSettingsTest(lightTheme)
        }else {
            changeThemeSettingsTest(darkTheme)
        }
    }

    return { config,changeThemeSettingsTest,switchTheme,getThemeMode,isDark,darkTheme}
})
