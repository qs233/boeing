const MAIN_URL =  'http://backstage.airplaneinspection.com/';

export default {
    // 用户相关
    token : null,
    userId : null,
    position : null,
    gender : null,
    userName : null,

    // url_user : 'http://backstage.airplaneinspection.cn:8001/users/',
    // url_user : 'http://backstage.airplaneinspection.cn:8001/users/',
    url_user : MAIN_URL + 'users/',

    // url_detection:'http://backstage.airplaneinspection.cn:8001/detections/',
    url_detection :MAIN_URL + 'detections/',


    // url_main : 'http://backstage.airplaneinspection.cn:8001/detections/?',
    url_main: MAIN_URL + 'detections/?',


    // url_login: 'http://backstage.airplaneinspection.cn:8001/api-token-auth/',
    url_login : MAIN_URL + 'api-token-auth/',


    url_select_plane: MAIN_URL + 'planeinfos/?',
    // url_select_plane : 'http://backstage.airplaneinspection.cn:8001/planeinfos/',

    url_default_month: MAIN_URL + 'scarmonth/scar_type/?',
    url_default_date: MAIN_URL + 'scardate/scar_type/?',


}
