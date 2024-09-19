"use client";

import React from 'react';
import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger 
} from "@/components/ui/popover";
import {  useInboxNotifications, useUnreadInboxNotificationsCount, useUpdateRoomNotificationSettings } from '@liveblocks/react';
import { 
    InboxNotification, 
    InboxNotificationList 
} from "@liveblocks/react-ui"; 
import { useEffect } from 'react';

const NotificationBox = ({ children }) => {
    const { inboxNotifications } = useInboxNotifications();
    const updateRoomNotificationSettings=useUpdateRoomNotificationSettings();

    const {count,error,isLoading}=useUnreadInboxNotificationsCount();


      useEffect(()=>{
        updateRoomNotificationSettings({threads:'all'})
      },[])

    // Add a check for undefined or empty notifications
    if (!inboxNotifications || inboxNotifications.length === 0) {
        return (
            <Popover>
                <PopoverTrigger>{children}</PopoverTrigger>
                <PopoverContent>No notifications available</PopoverContent>
            </Popover>
        );
    }

    return (
        <Popover>
            <PopoverTrigger>{children}</PopoverTrigger>
            <PopoverContent  className={"w-[500px]"}>
                <InboxNotificationList>
                    {inboxNotifications.map((inboxNotification) => (
                        <InboxNotification
                            key={inboxNotification.id}
                            inboxNotification={inboxNotification}
                        />
                    ))}
                </InboxNotificationList>
            </PopoverContent>
        </Popover>
    );
}

export default NotificationBox;
