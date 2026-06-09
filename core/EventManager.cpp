#include "EventManager.h"

/* =========================================================
   STATIC MEMBERS
   ========================================================= */

EventCallback
EventManager::s_subscribers[
    EventManager::MAX_SUBSCRIBERS
] = { nullptr };

uint8_t
EventManager::s_subscriberCount = 0;

/* =========================================================
   INITIALIZATION
   ========================================================= */

void EventManager::begin()
{
    s_subscriberCount = 0;

    for (uint8_t i = 0;
         i < MAX_SUBSCRIBERS;
         ++i)
    {
        s_subscribers[i] = nullptr;
    }
}

/* =========================================================
   SUBSCRIBE
   ========================================================= */

bool EventManager::subscribe(
    EventCallback callback
)
{
    if (callback == nullptr)
    {
        return false;
    }

    /* Prevent duplicate registration */

    for (uint8_t i = 0;
         i < s_subscriberCount;
         ++i)
    {
        if (s_subscribers[i] == callback)
        {
            return true;
        }
    }

    if (s_subscriberCount >= MAX_SUBSCRIBERS)
    {
        return false;
    }

    s_subscribers[
        s_subscriberCount++
    ] = callback;

    return true;
}

/* =========================================================
   UNSUBSCRIBE
   ========================================================= */

bool EventManager::unsubscribe(
    EventCallback callback
)
{
    if (callback == nullptr)
    {
        return false;
    }

    for (uint8_t i = 0;
         i < s_subscriberCount;
         ++i)
    {
        if (s_subscribers[i] == callback)
        {
            /* Shift remaining entries */

            for (uint8_t j = i;
                 j < (s_subscriberCount - 1);
                 ++j)
            {
                s_subscribers[j] =
                    s_subscribers[j + 1];
            }

            s_subscribers[
                s_subscriberCount - 1
            ] = nullptr;

            --s_subscriberCount;

            return true;
        }
    }

    return false;
}

/* =========================================================
   PUBLISH EVENT
   ========================================================= */

void EventManager::publish(
    EventType eventType,
    const EventData& data
)
{
    for (uint8_t i = 0;
         i < s_subscriberCount;
         ++i)
    {
        EventCallback callback =
            s_subscribers[i];

        if (callback != nullptr)
        {
            callback(
                eventType,
                data
            );
        }
    }
}