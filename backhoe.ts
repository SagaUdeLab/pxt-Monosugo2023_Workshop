/**
 * ものすごフェスタ2023用
 * micro:bitでMSD700のバックホウアタッチメントを制御します
 */
//% weight=200 color=#ff8c00 icon="\uf085" block="ものスゴフェスタ2023"
//% groups=["ブーム", "アーム", "バケット", "特殊", "others"]
namespace Monosugo2023_Workshop_Backhoe {

    let isCylindersMoving: boolean = false;

    const boomCylinder = new CylinderDriver.Cylinders(Kitronik_Robotics_Board.Motors.Motor1);
    const armCylinder = new CylinderDriver.Cylinders(Kitronik_Robotics_Board.Motors.Motor2);
    const bucketCylinder = new CylinderDriver.Cylinders(Kitronik_Robotics_Board.Motors.Motor3);

    /**
      * すべてのシリンダーを初期位置にします。初期位置にした後はシリンダーが動ける状態になっています。
    */
    //% block="すべてのシリンダーを初期位置にする"
    export function initializeAllCylinders(): void {
        const forElise = music.stringPlayable("E5:1 D5#:1 E5:1 D5#:1 E5:1 B4:1 D5:1 C5:1 A4:2 R:1 C4:1 E4:1 A4:1 B4:2 R:1 E4:1 G4#:1 B4:1 C5:2 R:1 E4:1 E5:1 D5#:1 E5:1 D5#:1 E5:1 B4:1 D5:1 C5:1 A4:2 R:1 C4:1 E4:1 A4:1 B4:2 R:1 E4:1 C5:1 B4:1 A4:2 R:2", 110);

        basic.clearScreen();

        if (isCylindersMoving) { return; }
        isCylindersMoving = true;
        enableCylinders();

        //basic.showString("INIT");
        basic.showLeds(`
        #####
        #####
        #####
        #####
        #####
        `);
        basic.clearScreen();

        music.play(forElise, music.PlaybackMode.LoopingInBackground);
        basic.showLeds(`
        .....
        .....
        ..#..
        .....
        .....
        `);
        bucketCylinder.home();


        if (!CylinderDriver.Cylinders.isCylindersEnabled) { return };

        basic.showLeds(`
        .....
        .###.
        .###.
        .###.
        .....
        `);
        boomCylinder.extend(false);
        basic.pause(CylinderDriver.durationToHomeCylinder);
        boomCylinder.stop(false);

        if (!CylinderDriver.Cylinders.isCylindersEnabled) { return };

        basic.showLeds(`
        #####
        #####
        #####
        #####
        #####
        `);
        armCylinder.home(false);

        music.stopAllSounds();
        isCylindersMoving = false;
        basic.showIcon(IconNames.Yes);
    }

    /**
      * ブームシリンダーを一定の時間、伸ばします。
      * @param duration 動かしたい時間
    */
    //% block="ブームシリンダーを $duration秒間伸ばす"
    //% group="ブーム"
    //% duration.min=0 duration.max=20 duration.defl=5
    export function extendBoomCylinder(duration: number): void {
        let startTime: number = input.runningTime();

        if (!CylinderDriver.Cylinders.isCylindersEnabled || isCylindersMoving) { return; }
        isCylindersMoving = true;
        if (boomCylinder.status != CylinderDriver.CylinderStateEnum.Stopping) { return; }
        boomCylinder.control(CylinderDriver.CylinderDirectionEnum.Extend);
        basic.pause(duration * 1e3);
        boomCylinder.stop();
        isCylindersMoving = false;
        basic.pause(500);
    }

    /**
     * ブームシリンダーを一定の時間、縮めます。
     * @param duration 動かしたい時間
    */
    //% block="ブームシリンダーを $duration秒間縮める"
    //% group="ブーム"
    //% duration.min=0 duration.max=20 duration.defl=5
    export function shrinkBoomCylinder(duration: number): void {
        let startTime: number = input.runningTime();

        if (!CylinderDriver.Cylinders.isCylindersEnabled || isCylindersMoving) { return; }
        isCylindersMoving = true;
        if (boomCylinder.status != CylinderDriver.CylinderStateEnum.Stopping) { return; }
        boomCylinder.control(CylinderDriver.CylinderDirectionEnum.Shrink);
        basic.pause(duration * 1e3);
        boomCylinder.stop();
        isCylindersMoving = false;
        basic.pause(500);
    }

    /**
     * アームシリンダーを一定の時間、伸ばします。
     * @param duration 動かしたい時間
    */
    //% block="アームシリンダーを $duration秒間伸ばす"
    //% group="アーム"
    //% duration.min=0 duration.max=20 duration.defl=5
    export function extendArmCylinder(duration: number): void {
        let startTime: number = input.runningTime();

        if (!CylinderDriver.Cylinders.isCylindersEnabled || isCylindersMoving) { return; }
        isCylindersMoving = true;
        if (armCylinder.status != CylinderDriver.CylinderStateEnum.Stopping) { return; }
        armCylinder.control(CylinderDriver.CylinderDirectionEnum.Extend);
        basic.pause(duration * 1e3);
        armCylinder.stop();
        isCylindersMoving = false;
        basic.pause(500);
    }

    /**
     * アームシリンダーを一定の時間、縮めます。
     * @param duration 動かしたい時間
    */
    //% block="アームシリンダーを $duration秒間縮める"
    //% group="アーム"
    //% duration.min=0 duration.max=20 duration.defl=5
    export function shrinkArmCylinder(duration: number): void {
        let startTime: number = input.runningTime();

        if (!CylinderDriver.Cylinders.isCylindersEnabled || isCylindersMoving) { return; }
        isCylindersMoving = true;
        if (armCylinder.status != CylinderDriver.CylinderStateEnum.Stopping) { return; }
        armCylinder.control(CylinderDriver.CylinderDirectionEnum.Shrink);
        basic.pause(duration * 1e3);
        armCylinder.stop();
        isCylindersMoving = false;
        basic.pause(500);
    }

    /**
     * バケットシリンダーを一定の時間、伸ばします。
     * @param duration 動かしたい時間
    */
    //% block="バケットシリンダーを $duration秒間伸ばす"
    //% group="バケット"
    //% duration.min=0 duration.max=20 duration.defl=5
    export function extendBucketCylinder(duration: number): void {
        let startTime: number = input.runningTime();

        if (!CylinderDriver.Cylinders.isCylindersEnabled || isCylindersMoving) { return; }
        isCylindersMoving = true;
        if (bucketCylinder.status != CylinderDriver.CylinderStateEnum.Stopping) { return; }
        bucketCylinder.control(CylinderDriver.CylinderDirectionEnum.Extend);
        basic.pause(duration * 1e3);
        bucketCylinder.stop();
        isCylindersMoving = false;
        basic.pause(500);
    }

    /**
     * バケットシリンダーを一定の時間、縮めます。
     * @param duration 動かしたい時間
    */
    //% block="バケットシリンダーを $duration秒間縮める"
    //% group="バケット"
    //% duration.min=0 duration.max=20 duration.defl=5
    export function shrinkBucketCylinder(duration: number): void {
        let startTime: number = input.runningTime();

        if (!CylinderDriver.Cylinders.isCylindersEnabled || isCylindersMoving) { return; }
        isCylindersMoving = true;
        if (bucketCylinder.status != CylinderDriver.CylinderStateEnum.Stopping) { return; }
        bucketCylinder.control(CylinderDriver.CylinderDirectionEnum.Shrink);
        basic.pause(duration * 1e3);
        bucketCylinder.stop();
        isCylindersMoving = false;
        basic.pause(500);
    }

    /**
      * 好きなシリンダーを一定の時間、伸ばしたり縮めたりできます。
      * @param target 動かしたいシリンダー
      * @param direction 動かしたい方向
      * @param duration 動かしたい時間
    */
    //% block="$target のシリンダーを $duration秒間 $direction"
    //% group="特殊"
    //% duration.min=0 duration.max=20 duration.defl=5
    export function controlCylinder(target: CylinderDriver.CylindersEnum, direction: CylinderDriver.CylinderDirectionEnum, duration: number): void {
        let startTime: number = input.runningTime();
        let targetCylinder: CylinderDriver.Cylinders;

        if (!CylinderDriver.Cylinders.isCylindersEnabled || isCylindersMoving) { return; }

        isCylindersMoving = true;

        switch (target) {
            case CylinderDriver.CylindersEnum.Boom:
                targetCylinder = boomCylinder;
                break;
            case CylinderDriver.CylindersEnum.Arm:
                targetCylinder = armCylinder;
                break;
            case CylinderDriver.CylindersEnum.Bucket:
                targetCylinder = bucketCylinder;
                break;
        }

        if (targetCylinder.status != CylinderDriver.CylinderStateEnum.Stopping) { return; }

        targetCylinder.control(direction);

        /*
        while (input.runningTime() - startTime < duration * 1e3) {
            if (!CylinderDriver.Cylinders.isCylindersEnabled) {
                targetCylinder.stop();
                isCylindersMoving = false;
                return;
            }
        }
        */
        basic.pause(duration * 1e3);

        targetCylinder.stop();
        isCylindersMoving = false;

        basic.pause(500);
    }

    /**
      * すべてのシリンダーを緊急停止します。
      * 緊急停止後はシリンダーが動けない状態にされます。
    */
    //% block="シリンダーを緊急停止"
    //% group="特殊"
    export function emergencyStop(): void {
        CylinderDriver.Cylinders.emergencyStop();
        isCylindersMoving = false;
    }

    /**
      * シリンダーを動ける状態にします。
    */
    //% block="シリンダーを動ける状態にする"
    //% group="特殊"
    export function enableCylinders(): void {
        CylinderDriver.Cylinders.enableCylinders();
    }

    /**
      * シリンダーを動けない状態にします。micro:bitを起動した後は、シリンダーは動けない状態になっています。
    */
    //% block="シリンダーを動けない状態にする"
    //% group="特殊"
    export function disableCylinders(): void {
        CylinderDriver.Cylinders.disableCylinders();
    }

    input.onButtonPressed(Button.B, () => emergencyStop());
}