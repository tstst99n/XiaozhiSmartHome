#pragma once

#include <Arduino.h>

namespace Pins
{
    /* AC Dimmer */

    constexpr uint8_t ZERO_CROSS = 4;
    constexpr uint8_t TRIAC      = 5;
    constexpr uint8_t FAN_POT    = 1;

    /* Relays */

    constexpr uint8_t RELAY_1 = 14;
    constexpr uint8_t RELAY_2 = 15;
    constexpr uint8_t RELAY_3 = 16;
    constexpr uint8_t RELAY_4 = 17;
    constexpr uint8_t RELAY_5 = 18;
    constexpr uint8_t RELAY_6 = 8;

    constexpr uint8_t RELAYS[6] =
    {
        RELAY_1,
        RELAY_2,
        RELAY_3,
        RELAY_4,
        RELAY_5,
        RELAY_6
    };

    /* Push Buttons */

    constexpr uint8_t BUTTON_1 = 9;
    constexpr uint8_t BUTTON_2 = 10;
    constexpr uint8_t BUTTON_3 = 11;
    constexpr uint8_t BUTTON_4 = 12;
    constexpr uint8_t BUTTON_5 = 13;

    constexpr uint8_t BUTTONS[5] =
    {
        BUTTON_1,
        BUTTON_2,
        BUTTON_3,
        BUTTON_4,
        BUTTON_5
    };

    /* DHT22 */

    constexpr uint8_t DHT22 = 6;

    /* OLED + RTC (PDF OLED section) */

    constexpr uint8_t I2C_SDA = 21;
    constexpr uint8_t I2C_SCL = 47;
}