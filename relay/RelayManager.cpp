#include "RelayManager.h"

#include "../Config/Config.h"
#include "../Config/Pins.h"

#include "../Core/SystemState.h"
#include "../Core/PreferencesManager.h"
#include "../Core/Logger.h"
#include "../Core/LogStorage.h"

/* =========================================================
   INITIALIZATION
   ========================================================= */

bool RelayManager::begin()
{
    for (uint8_t i = 0; i < RELAY_COUNT; i++)
    {
        pinMode(
            Pins::RELAYS[i],
            OUTPUT
        );

        digitalWrite(
            Pins::RELAYS[i],
            LOW
        );
    }

    return restoreStates();
}

/* =========================================================
   VALIDATION
   ========================================================= */

bool RelayManager::isValidRelay(
    uint8_t relayIndex
)
{
    return relayIndex < RELAY_COUNT;
}

/* =========================================================
   HARDWARE UPDATE
   ========================================================= */

void RelayManager::applyHardwareState(
    uint8_t relayIndex,
    bool state
)
{
    digitalWrite(
        Pins::RELAYS[relayIndex],
        state ? HIGH : LOW
    );
}

/* =========================================================
   SET STATE
   ========================================================= */

bool RelayManager::setState(
    uint8_t relayIndex,
    bool state
)
{
    if (!isValidRelay(relayIndex))
    {
        Logger::error(
            "Relay",
            "Invalid relay index"
        );

        return false;
    }

    applyHardwareState(
        relayIndex,
        state
    );

    gSystemState.relays[
        relayIndex
    ] = state;

    PreferencesManager::saveRelayState(
        relayIndex,
        state
    );

    String logMessage =
        String("Relay ")
        + String(relayIndex + 1)
        + (state ? " ON" : " OFF");

    Logger::info(
        "Relay",
        logMessage
    );

    LogStorage::add(
        LogCategory::RELAY,
        logMessage
    );

    return true;
}

/* =========================================================
   TURN ON
   ========================================================= */

bool RelayManager::turnOn(
    uint8_t relayIndex
)
{
    return setState(
        relayIndex,
        true
    );
}

/* =========================================================
   TURN OFF
   ========================================================= */

bool RelayManager::turnOff(
    uint8_t relayIndex
)
{
    return setState(
        relayIndex,
        false
    );
}

/* =========================================================
   TOGGLE
   ========================================================= */

bool RelayManager::toggle(
    uint8_t relayIndex
)
{
    if (!isValidRelay(relayIndex))
    {
        return false;
    }

    return setState(
        relayIndex,
        !gSystemState.relays[
            relayIndex
        ]
    );
}

/* =========================================================
   GET STATE
   ========================================================= */

bool RelayManager::getState(
    uint8_t relayIndex
)
{
    if (!isValidRelay(relayIndex))
    {
        return false;
    }

    return gSystemState.relays[
        relayIndex
    ];
}

/* =========================================================
   ALL ON
   ========================================================= */

void RelayManager::turnAllOn()
{
    for (uint8_t i = 0; i < RELAY_COUNT; i++)
    {
        setState(
            i,
            true
        );
    }
}

/* =========================================================
   ALL OFF
   ========================================================= */

void RelayManager::turnAllOff()
{
    for (uint8_t i = 0; i < RELAY_COUNT; i++)
    {
        setState(
            i,
            false
        );
    }
}

/* =========================================================
   SAVE STATES
   ========================================================= */

bool RelayManager::saveStates()
{
    bool success = true;

    for (uint8_t i = 0; i < RELAY_COUNT; i++)
    {
        success &=
            PreferencesManager::saveRelayState(
                i,
                gSystemState.relays[i]
            );
    }

    return success;
}

/* =========================================================
   RESTORE STATES
   ========================================================= */

bool RelayManager::restoreStates()
{
    for (uint8_t i = 0; i < RELAY_COUNT; i++)
    {
        bool state =
            PreferencesManager::loadRelayState(
                i,
                false
            );

        gSystemState.relays[i] =
            state;

        applyHardwareState(
            i,
            state
        );
    }

    Logger::info(
        "Relay",
        "Relay states restored"
    );

    return true;
}

/* =========================================================
   RELAY COUNT
   ========================================================= */

uint8_t RelayManager::relayCount()
{
    return RELAY_COUNT;
}