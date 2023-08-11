namespace CylinderDriver {

    export const durationToHomeCylinder: number = 10e3; // microseconds

    export const enum CylindersEnum {
        //% block="ブーム"
        Boom,
        //% block="アーム"
        Arm,
        //% block="バケット"
        Bucket
    };

    export const enum CylinderDirectionEnum {
        //% block="伸ばす"
        Extend,
        //% block="縮める"
        Shrink,
        //% block="止める"
        Stop
    };

    export const enum CylinderStateEnum {
        Extending,
        Shrinking,
        Stopping
    }

    export class Cylinders {
        private static _isCylindersEnabled: boolean = false;

        private pinAssignment: Kitronik_Robotics_Board.Motors;
        private _status: CylinderStateEnum = CylinderStateEnum.Stopping;

        constructor(pinAssignment: Kitronik_Robotics_Board.Motors) {
            this.pinAssignment = pinAssignment;
            Kitronik_Robotics_Board.motorOff(this.pinAssignment);
        }

        extend(showStatus: boolean = true): void {
            if (Cylinders._isCylindersEnabled) {
                this._status = CylinderStateEnum.Extending;
                if (showStatus) { this.showStatus(); }
                Kitronik_Robotics_Board.motorOn(
                    this.pinAssignment,
                    Kitronik_Robotics_Board.MotorDirection.Forward,
                    100
                );
            }
            else {
                basic.showIcon(IconNames.No);
            }
        }

        shrink(showStatus: boolean = true): void {
            if (Cylinders._isCylindersEnabled) {
                this._status = CylinderStateEnum.Shrinking;
                if (showStatus) { this.showStatus(); }
                Kitronik_Robotics_Board.motorOn(
                    this.pinAssignment,
                    Kitronik_Robotics_Board.MotorDirection.Reverse,
                    100
                );
            }
            else {
                basic.showIcon(IconNames.No);
            }
        }

        stop(showStatus: boolean = true): void {
            this._status = CylinderStateEnum.Stopping;
            if (showStatus) { this.showStatus() };
            Kitronik_Robotics_Board.motorOff(this.pinAssignment);
        }

        control(direction: CylinderDirectionEnum, showStatus: boolean = true): void {
            if (Cylinders._isCylindersEnabled) {
                switch (direction) {
                    case CylinderDirectionEnum.Extend:
                        this.extend(showStatus);
                        break;
                    case CylinderDirectionEnum.Shrink:
                        this.shrink(showStatus);
                        break;
                    case CylinderDirectionEnum.Stop:
                        this.stop(showStatus);
                        break;
                }
            }
            else {
                basic.showIcon(IconNames.No);
            }
        }

        home(showStatus: boolean = true): void {
            this.shrink(showStatus);
            basic.pause(durationToHomeCylinder);
            this.stop(showStatus);
        }

        private showStatus(): void {
            basic.clearScreen();
            music.stopAllSounds();
            switch (this.status) {
                case CylinderStateEnum.Extending:
                    basic.showNumber((this.pinAssignment - 40) / 8 + 1);
                    /*
                    music.play(
                        music.createSoundExpression(
                            WaveShape.Sine,
                            5000,
                            1500,
                            255,
                            0,
                            1000,
                            SoundExpressionEffect.None,
                            InterpolationCurve.Curve),
                        music.PlaybackMode.LoopingInBackground);
                    */
                    music.setTempo(110);
                    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Entertainer), music.PlaybackMode.LoopingInBackground);
                    break;
                case CylinderStateEnum.Shrinking:
                    basic.showNumber((this.pinAssignment - 40) / 8 + 1);
                    /*
                    music.play(
                        music.createSoundExpression(
                            WaveShape.Sine,
                            1500,
                            5000,
                            255,
                            0,
                            1000,
                            SoundExpressionEffect.None,
                            InterpolationCurve.Curve),
                        music.PlaybackMode.LoopingInBackground);
                    */
                    music.setTempo(120);
                    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Ode), music.PlaybackMode.LoopingInBackground)
                    break;
                case CylinderStateEnum.Stopping:
                    basic.clearScreen();
                    music.stopAllSounds();
                    break;
            }
        }

        static emergencyStop(): void {
            Kitronik_Robotics_Board.allOff();
            this._isCylindersEnabled = false;
            basic.clearScreen();
            music.stopAllSounds();
            basic.showIcon(IconNames.No);
        }

        get status(): CylinderStateEnum {
            return this._status;
        }

        static get isCylindersEnabled(): boolean {
            return this._isCylindersEnabled;
        }

        static enableCylinders(): void {
            this._isCylindersEnabled = true;
        }

        static disableCylinders(): void {
            this._isCylindersEnabled = false;
        }
    }
}