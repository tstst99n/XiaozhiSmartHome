#include "ButtonManager.h"

#include "../Config/Pins.h"

#include "RelayManager.h"

#include "../Core/Logger.h"
#include "../Core/LogStorage.h"

/* =========================================================
   STATIC MEMBERS
   ========================================================= */

ButtonState ButtonManager::s_buttons[BUTTON_COUNT];

/* =========================================================
   INITIALIZATION
   ========================================================= */

bool ButtonManager::begin()
{
    pinMode(
        Pins::BUTTON_1,
        INPUT_PULLUP
    );

    pinMode(
        Pins::BUTTON_2,
        INPUT_PULLUP
    );

    pinMode(
        Pins::BUTTON_3,
        INPUT_PULLUP
    );

    pinMode(
        Pins::BUTTON_4,
        INPUT_PULLUP
    );

    Logger::info(
        "Button",
        "ButtonManager initialized"
    );

    return true;
}

/* =========================================================
   UPDATE
   ========================================================= */

void ButtonManager::update()
{
    for (uint8_t i = 0; i < buttonCount(); i++)
    {
        processButton(i);
    }
}

/* =========================================================
   PROCESS BUTTON
   ========================================================= */

void ButtonManager::processButton(
    uint8_t buttonIndex
)
{
    if (!isValidButton(buttonIndex))
    {
        return;
    }

    const uint8_t buttonPins[BUTTON_COUNT]
{
    Pins::BUTTON_1,
    Pins::BUTTON_2,
    Pins::BUTTON_3,
    Pins::BUTTON_4
};
    ButtonState& btn =
        s_buttons[buttonIndex];

    bool reading =
        !digitalRead(
            buttonPins[buttonIndex]
        );

    if (reading != btn.previousState)
    {
        btn.lastDebounceTime =
            millis();
    }

    if (
        (millis() - btn.lastDebounceTime)
        > DEBOUNCE_MS
    )
    {
        if (reading != btn.currentState)
        {
            btn.currentState =
                reading;

            if (btn.currentState)
            {
                btn.pressStartTime =
                    millis();

                btn.longPressHandled =
                    false;

                handleEvent(
                    buttonIndex,
                    ButtonEventType::PRESS
                );
            }
            else
            {
                handleEvent(
                    buttonIndex,
                    ButtonEventType::RELEASE
                );

                if (
                    !btn.longPressHandled
                )
                {
                    handleEvent(
                        buttonIndex,
                        ButtonEventType::CLICK
                    );
                }
            }
        }
    }

    if (
        btn.currentState &&
        !btn.longPressHandled &&
        (millis() - btn.pressStartTime)
            >= LONG_PRESS_MS
    )
    {
        btn.longPressHandled =
            true;

        handleEvent(
            buttonIndex,
            ButtonEventType::LONG_PRESS
        );
    }

    btn.previousState =
        reading;
}

/* =========================================================
   HANDLE EVENT
   ========================================================= */

void ButtonManager::handleEvent(
    uint8_t buttonIndex,
    ButtonEventType eventType
)
{
    switch (eventType)
    {
        case ButtonEventType::CLICK:
        {
            if (buttonIndex < 5)
            {
                RelayManager::toggle(
                    buttonIndex
                );
            }

            Logger::info(
                "Button",
                String("Button ")
                + String(buttonIndex + 1)
                + " Click"
            );

            LogStorage::add(
                LogCategory::BUTTON,
                String("Button ")
                + String(buttonIndex + 1)
                + " Click"
            );

            break;
        }

        case ButtonEventType::LONG_PRESS:
        {
            Logger::warning(
                "Button",
                String("Button ")
                + String(buttonIndex + 1)
                + " Long Press"
            );

            LogStorage::add(
                LogCategory::BUTTON,
                String("Button ")
                + String(buttonIndex + 1)
                + " Long Press"
            );

            break;
        }

        default:
            break;
    }
}

/* =========================================================
   BUTTON COUNT
   ========================================================= */

uint8_t ButtonManager::buttonCount()
{
    return BUTTON_COUNT;
}

/* =========================================================
   VALIDATION
   ========================================================= */

bool ButtonManager::isValidButton(
    uint8_t buttonIndex
)
{
    return buttonIndex <
           buttonCount();
}

/* =========================================================
   PRESSED STATE
   ========================================================= */

bool ButtonManager::isPressed(
    uint8_t buttonIndex
)
{
    if (!isValidButton(buttonIndex))
    {
        return false;
    }

    return s_buttons[
        buttonIndex
    ].currentState;
}