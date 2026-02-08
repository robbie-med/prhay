window.Prhay = window.Prhay || {};

window.Prhay.initOneSignal = () => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async function(OneSignal) {
        await OneSignal.init({
            appId: "7847fc57-03e6-4e9f-9328-a7b6ae48b31e",
            safari_web_id: "web.onesignal.auto.054b4fc9-febb-45d1-b366-8fc183da0d9e",
            notifyButton: {
                enable: true,
            },
            allowLocalhostAsSecureOrigin: true,
        });
        console.log("OneSignal initialized");
    });
};
