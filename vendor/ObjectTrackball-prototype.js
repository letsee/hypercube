/** 오브젝트와 터치 인터렉션 시 오브젝트의 회전축을 360도 제어할 수 있다.
 * 
 * @class ObjectTrackball
 * @constructor
 * @namespace LWidget
 * @prop {Object} model  제어 대상의 오브젝트 모델
 * @prop {Double} speed  큐브의 회전 속도
 * @prop {Object} touch  터치 인터렉션 제어
 * 
 * @method load
 * @method touchDown
 * @method touchMove
 * @method touchUp
 * @method touchControl
 * @method rotateObject
 * @method thread
 * @method handler
 * @method getPinchDist
 * @method isPinch
 * 
 */

var self;

function ObjectTrackball(model, object){
    this.model = model;
    this.speed = object.speed;

    this.touch = {
        on : false,
        pointer : {
            rotate : {
                start :  new Vector3(0, 0, 1),
                end   :  new Vector3(0, 0, 1)
            },
            start : {
                x : 0,
                y : 0
            }
        },
        quaternion : null,
        window : {
            fx : window.innerWidth / 2,
            fy : window.innerHeight / 2
        },
        speed : this.speed,
        time : {
            lastMove : 0,
            release  : 50
        },
        delta : {
            x : 0,
            y : 0
        },
        pinch : {
            on : false,
            dist : 0
        }
    };

    self = this;

    ObjectTrackball.prototype.load = function(){
        Letsee.addEventListener("trackmove", this.thread);
        document.addEventListener('touchstart', this.touchDown);
    }

    ObjectTrackball.prototype.touchDown = function(e){

        if(e.touches.length === 2) self.touch.pinch.on = true;

        document.addEventListener('touchmove', self.touchMove);
        document.addEventListener('touchend', self.touchUp);

        self.touch.on = true;

        self.touch.pointer.start = {
            x: e.touches[0].screenX,
            y: e.touches[0].screenY
        };

        self.touch.pointer.rotate.start = self.touch.pointer.rotate.end = self.touchControl(0, 0);
    }

    ObjectTrackball.prototype.touchMove = function(e){

        if(self.touch.pinch.on){
            self.touch.pinch.dist = Math.sqrt(
                (e.touches[0].screenX-e.touches[1].screenX) * (e.touches[0].screenX-e.touches[1].screenX) +
                (e.touches[0].screenY-e.touches[1].screenY) * (e.touches[0].screenY-e.touches[1].screenY)
            );

        }else{

            self.touch.delta.x = e.touches[0].screenX - self.touch.pointer.start.x;
            self.touch.delta.y = e.touches[0].screenY - self.touch.pointer.start.y;

            self.handler();

            self.touch.pointer.start.x = e.touches[0].screenX;
            self.touch.pointer.start.y = e.touches[0].screenY;

            self.touch.time.lastMove = new Date();
        }

    }

    ObjectTrackball.prototype.touchUp = function(e){

        if(self.touch.pinch.on){

            setTimeout(function(){
                self.touch.pinch.on = false;
            }, 100);
            
        }else{

            if(new Date().getTime() - self.touch.time.lastMove.getTime() > self.touch.time.release){
                self.touch.delta.x = e.touches[0].screenX - self.touch.pointer.start.x;
                self.touch.delta.y = e.touches[0].screenY - self.touch.pointer.start.y;
            }

            self.touch.on = false;
            
        }

        document.removeEventListener('touchmove', self.touchMove);
        document.removeEventListener('touchend', self.touchUp);

    }

    ObjectTrackball.prototype.touchControl = function(touchX, touchY){
        let
            move = new Vector3();

        move.set( Math.min(Math.max(touchX / this.touch.window.fx, -1), 1), Math.min(Math.max(-touchY / this.touch.window.fy, -1), 1), 0.0);

        let 
            len = move.length();

        len > 1.0 ? move.normalize() : move.z = Math.sqrt(1.0 - len * len);

        return move;
    }

    ObjectTrackball.prototype.rotateObject = function(rotateStart, rotateEnd){
        let axis = new Vector3(),
            quater = new Quaternion();

        let 
            angle = Math.acos(rotateStart.dot(rotateEnd) / rotateStart.length() / rotateEnd.length());

        if(angle){
            axis.crossVectors(rotateStart, rotateEnd).normalize();
            angle *= this.touch.speed;
            
            quater.setFromAxisAngle(axis, angle);
        }

        return quater;
    }

    ObjectTrackball.prototype.thread = function(){
        if(self.touch.on)return;

        let drag = 0.95,
            min = 0.05;

        self.touch.delta.x < -min || self.touch.delta.x > min ? self.touch.delta.x *= drag : self.touch.delta.x = 0;
        self.touch.delta.y < -min || self.touch.delta.y > min ? self.touch.delta.y *= drag : self.touch.delta.y = 0;

        self.handler();
    }

    ObjectTrackball.prototype.handler = function(){
        this.touch.pointer.rotate.end = this.touchControl(-this.touch.delta.x, -this.touch.delta.y);

        let 
            rotate = this.rotateObject(this.touch.pointer.rotate.start, this.touch.pointer.rotate.end);
        
        this.touch.quaternion = this.model.quaternion;
        this.touch.quaternion.multiplyQuaternions(rotate, this.touch.quaternion);
        this.touch.quaternion.normalize();

        this.model.quaternion.copy(this.touch.quaternion);
        this.touch.pointer.rotate.end = this.touch.pointer.rotate.start;
    }

    ObjectTrackball.prototype.getPinchDist = function(){
        return this.touch.pinch.dist;
    }

    ObjectTrackball.prototype.isPinch = function(){
        return this.touch.pinch.on;
    }

}