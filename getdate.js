/**
 * Created by Iaroslav Zhbankov on 18.12.2016.
 */
module.exports = {
    currentTime: function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        var hours = today.getHours();
        var min = today.getMinutes();
        var sec = today.getSeconds();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        if (min < 10) {
            min = '0' + min
        }
        if (sec < 10) {
            sec = '0' + sec
        }

        return today = mm + '/' + dd + '/' + yyyy + ', ' + hours + ':' + min + ':' + sec;
    }
}