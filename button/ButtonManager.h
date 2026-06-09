#pragma once

#include <Arduino.h>
#include "../Config/Config.h"

/* =========================================================
   BUTTON EVENT TYPES
   ========================================================= */

enum class ButtonEventType : uint8_t
{
    NONE = 0,
    PRESS,
    RELEASE,
    CLICK,
    LONG_PRESS
};

/* =========================================================
   BUTTON STATE
   ========================================================= */

struct ButtonState
{
    bool currentState      = false;
    bool previousState     = false;

    bool longPressHandled  = false;

    uint32_t lastDebounceTime = 0;
    uint32_t pressStartTime   = 0;
};

/* =========================================================
   BUTTON MANAGER
   ========================================================= */

class ButtonManager
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
       Information
       ----------------------------------------------------- */

    static uint8_t buttonCount();

    static bool isPressed(
        uint8_t buttonIndex
    );

private:

    /* -----------------------------------------------------
       Internal Helpers
       ----------------------------------------------------- */

    static void processButton(
        uint8_t buttonIndex
    );

    static bool isValidButton(
        uint8_t buttonIndex
    );

    static void handleEvent(
        uint8_t buttonIndex,
        ButtonEventType eventType
    );

private:

    static ButtonState s_buttons[BUTTON_COUNT];

    static constexpr uint32_t DEBOUNCE_MS   = 50;

    static constexpr uint32_t LONG_PRESS_MS = 1500;
};