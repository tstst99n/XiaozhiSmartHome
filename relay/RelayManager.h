#pragma once

#include <Arduino.h>

/* =========================================================
   RELAY MANAGER
   ========================================================= */

class RelayManager
{
public:

    /* -----------------------------------------------------
       Initialization
       ----------------------------------------------------- */

    static bool begin();

    /* -----------------------------------------------------
       Single Relay Control
       ----------------------------------------------------- */

    static bool setState(
        uint8_t relayIndex,
        bool state
    );

    static bool turnOn(
        uint8_t relayIndex
    );

    static bool turnOff(
        uint8_t relayIndex
    );

    static bool toggle(
        uint8_t relayIndex
    );

    static bool getState(
        uint8_t relayIndex
    );

    /* -----------------------------------------------------
       Bulk Operations
       ----------------------------------------------------- */

    static void turnAllOn();

    static void turnAllOff();

    /* -----------------------------------------------------
       Persistence
       ----------------------------------------------------- */

    static bool saveStates();

    static bool restoreStates();

    /* -----------------------------------------------------
       Information
       ----------------------------------------------------- */

    static uint8_t relayCount();

private:

    /* -----------------------------------------------------
       Internal Helpers
       ----------------------------------------------------- */

    static bool isValidRelay(
        uint8_t relayIndex
    );

    static void applyHardwareState(
        uint8_t relayIndex,
        bool state
    );
};