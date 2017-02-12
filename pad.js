var keys = {
    forward: false,
    left: false,
    backward: false,
    right: false,
    moving: false
};
function onLoad() {
    var isAndroid = /Android/i.test(navigator.userAgent);
    if (window.DeviceMotionEvent !== undefined) {
        window.ondevicemotion = function (event) {
            ax = Math.floor(event.accelerationIncludingGravity.x);
            ay = Math.floor(event.accelerationIncludingGravity.y);
            az = Math.floor(event.accelerationIncludingGravity.z);
            document.getElementById('x').innerHTML = ax;
            document.getElementById('y').innerHTML = ay;
            document.getElementById('z').innerHTML = az;
            if (isAndroid ? ax > 4 : ax < -4) {
                if (!keys.left) {
                    keys.left = true;
                    updateMoving();
                }
            } else if (isAndroid ? ax < -4 : ax > 4) {
                if (!keys.right) {
                    keys.right = true;
                    keys.left = false;
                    updateMoving();
                }
            } else {
                if (keys.moving) {
                    keys.right = false;
                    keys.left = false;
                    updateMoving();
                }
            }
            if (isAndroid ? az > 4 : az < -4) {
                if (!keys.forward) {
                    keys.forward = true;
                    keys.moving = true;
                    document.getElementById('direction').innerHTML = 'FORWARD';
                    updateMoving();
                }
            } else {
                if (keys.forward) {
                    keys.forward = false;
                    keys.moving = false;
                    document.getElementById('direction').innerHTML = 'STOP';
                    updateMoving();
                }
            }
        }
    }
}
function updateMoving() {
    firebase.database().ref('moving').set(keys);
}
window.addEventListener('load', onLoad);