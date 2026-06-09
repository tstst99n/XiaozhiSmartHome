#include "Logger.h"

/* =========================================================
   STATIC MEMBERS
   ========================================================= */

LogLevel Logger::s_currentLevel =
    LogLevel::INFO;

/* =========================================================
   INITIALIZATION
   ========================================================= */

void Logger::begin(
    uint32_t baudRate
)
{
    Serial.begin(baudRate);

    delay(200);

    Serial.println();
    Serial.println(
        "========================================"
    );
    Serial.println(
        "Xiaozhi Smart Home Logger Started"
    );
    Serial.println(
        "========================================"
    );
}

/* =========================================================
   LOG LEVEL CONTROL
   ========================================================= */

void Logger::setLevel(
    LogLevel level
)
{
    s_currentLevel = level;
}

LogLevel Logger::getLevel()
{
    return s_currentLevel;
}

/* =========================================================
   LEVEL TO STRING
   ========================================================= */

const char* Logger::levelToString(
    LogLevel level
)
{
    switch (level)
    {
        case LogLevel::DEBUG:
            return "DEBUG";

        case LogLevel::INFO:
            return "INFO";

        case LogLevel::WARNING:
            return "WARNING";

        case LogLevel::ERROR:
            return "ERROR";

        case LogLevel::CRITICAL:
            return "CRITICAL";

        default:
            return "UNKNOWN";
    }
}

/* =========================================================
   MAIN LOG METHOD
   ========================================================= */

void Logger::log(
    LogLevel level,
    const String& tag,
    const String& message
)
{
    if (
        static_cast<uint8_t>(level)
        <
        static_cast<uint8_t>(s_currentLevel)
    )
    {
        return;
    }

    Serial.print("[");

    Serial.print(
        levelToString(level)
    );

    Serial.print("] ");

    Serial.print("[");

    Serial.print(tag);

    Serial.print("] ");

    Serial.println(message);
}

/* =========================================================
   DEBUG
   ========================================================= */

void Logger::debug(
    const String& tag,
    const String& message
)
{
    log(
        LogLevel::DEBUG,
        tag,
        message
    );
}

/* =========================================================
   INFO
   ========================================================= */

void Logger::info(
    const String& tag,
    const String& message
)
{
    log(
        LogLevel::INFO,
        tag,
        message
    );
}

/* =========================================================
   WARNING
   ========================================================= */

void Logger::warning(
    const String& tag,
    const String& message
)
{
    log(
        LogLevel::WARNING,
        tag,
        message
    );
}

/* =========================================================
   ERROR
   ========================================================= */

void Logger::error(
    const String& tag,
    const String& message
)
{
    log(
        LogLevel::ERROR,
        tag,
        message
    );
}

/* =========================================================
   CRITICAL
   ========================================================= */

void Logger::critical(
    const String& tag,
    const String& message
)
{
    log(
        LogLevel::CRITICAL,
        tag,
        message
    );
}