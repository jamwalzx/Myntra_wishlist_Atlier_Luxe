import { supabase } from './supabase';

export type EventType = 
  | 'wishlist_viewed'
  | 'help_me_choose_clicked'
  | 'use_case_selected'
  | 'comparison_viewed'
  | 'product_view_clicked';

export const logEvent = async (eventType: EventType, eventData: any = {}) => {
  try {
    // For MVP, we use the same mock user ID we used for the wishlist
    const mockUserId = 'a1b2c3d4-e5f6-7890-1234-56789abcdef0';

    const { error } = await supabase
      .from('analytics_events')
      .insert([
        {
          user_id: mockUserId,
          event_type: eventType,
          event_data: eventData,
          // timestamp is handled by the database default
        }
      ]);

    if (error) {
      console.error('Failed to log event:', error);
    } else {
      console.log(`[Analytics] Logged: ${eventType}`, eventData);
    }
  } catch (err) {
    console.error('Analytics error:', err);
  }
};
