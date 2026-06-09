#pragma once

#include <Arduino.h>

/* =========================================================
   DIMMER MANAGER
   TRIAC FAN SPEED CONTROLLER
   ========================================================= */

class DimmerManager
{
public:

    /* -----------------------------------------------------
       Initialization
       ----------------------------------------------------- */

    static bool begin();

    /* -----------------------------------------------------
       Runtime
       ----------------------------------------------------- */

    static void update();

    /* -----------------------------------------------------
       Fan Power Control
       ----------------------------------------------------- */

    static void turnOn();

    static void turnOff();

    static bool isOn();

    /* -----------------------------------------------------
       Fan Speed Control
       ----------------------------------------------------- */

    static bool setSpeed(
        uint8_t speedPercent
    );

    static uint8_t getSpeed();

    static void increaseSpeed(
        uint8_t step = 5
    );

    static void decreaseSpeed(
        uint8_t step = 5
    );

    /* -----------------------------------------------------
       Persistence
       ----------------------------------------------------- */

    static bool saveSettings();

    static bool restoreSettings();

private:

    /* -----------------------------------------------------
       Internal Helpers
       ----------------------------------------------------- */

    static uint16_t speedToDelay(
        uint8_t speedPercent
    );

    static void applyDimmerOutput();

private:

    static volatile bool     s_enabled;
    static volatile uint8_t  s_speedPercent;
    static volatile uint16_t s_phaseDelayUs;
};