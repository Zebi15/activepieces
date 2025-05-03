import { twoSolarAuth } from '../../index';
import {
  DedupeStrategy,
  Polling,
  pollingHelper,
} from '@activepieces/pieces-common';
import {
  TriggerStrategy,
  createTrigger,
  Property,
} from '@activepieces/pieces-framework';
import { TwoSolarCommon } from '../common';
import dayjs from 'dayjs';

/**
 * Interface representing a lead/person from the 2Solar API
 * Includes all standard fields and allows for additional properties
 */
interface TwoSolarLead {
  id: number;
  name: string;
  phone_number?: string;
  email?: string;
  address?: string;
  lead_type?: string;
  product_type?: string;
  created_date: string;
  [key: string]: any; // Allow any additional fields from the API
}

/**
 * Polling configuration for fetching new leads from 2Solar API
 * Uses time-based deduplication to prevent duplicate processing of leads
 * This polls every 5 minutes as per requirements
 */
const polling: Polling<
  string, // Auth type (API key as string)
  { lookbackPeriod?: number } // Props type with optional lookbackPeriod
> = {
  strategy: DedupeStrategy.TIMEBASED,
  items: async ({ auth, propsValue, lastFetchEpochMS }) => {
    let fetchFrom: string;
    
    // If this is the first run, look back by the specified period
    if (!lastFetchEpochMS) {
      const defaultLookback = propsValue.lookbackPeriod || 24;
      const date = new Date();
      date.setHours(date.getHours() - defaultLookback);
      fetchFrom = date.toISOString().replace('T', ' ').replace('Z', '');
    } else {
      // For subsequent runs, use the last fetch time
      fetchFrom = new Date(lastFetchEpochMS).toISOString().replace('T', ' ').replace('Z', '');
    }
    
    // Call the 2Solar API to get new leads
    const response = await fetch(
      `${TwoSolarCommon.baseUrl}${TwoSolarCommon.endpoints.searchPersons}?date_created_from=${encodeURIComponent(fetchFrom)}`,
      {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${auth}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch leads from 2Solar: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Map the results and return them with timestamps for deduplication
    return (data.results || []).map((lead: TwoSolarLead) => {
      return {
        epochMilliSeconds: dayjs(lead.created_date).valueOf(),
        data: lead
      };
    });
  },
  // Note: The polling interval is configured at the system level
  // Activepieces by default polls every 5 minutes which matches our requirements
};

/**
 * New Lead Trigger
 * 
 * Polls the 2Solar API every 5 minutes to fetch new leads/persons.
 * Implements deduplication based on creation time to prevent duplicate processing.
 * Returns all fields received from the API including name, phone number, email, 
 * address, lead type, product type, and any additional fields.
 */
export const newLead = createTrigger({
  auth: twoSolarAuth,
  name: 'new_lead',
  displayName: 'New Lead',
  description: 'Triggers when a new lead is created in 2Solar',
  props: {
    lookbackPeriod: Property.Number({
      displayName: 'Initial Lookback Period (hours)',
      description: 'How many hours to look back for leads on the first run',
      defaultValue: 24,
      required: false,
    }),
  },
  type: TriggerStrategy.POLLING,
  
  // Sample data to show in the UI
  sampleData: {
    id: 12345,
    name: 'John Doe',
    phone_number: '+31612345678',
    email: 'john.doe@example.com',
    address: '123 Main St, Amsterdam',
    lead_type: 'residential',
    product_type: 'solar panels',
    created_date: '2024-05-01 10:30:00'
  },
  
  // Test the trigger by fetching the most recent leads
  async test(context) {
    return await pollingHelper.test(polling, {
      store: context.store,
      auth: context.auth,
      propsValue: context.propsValue,
      files: context.files
    });
  },
  
  // Initialize the trigger when it's enabled
  async onEnable(context) {
    await pollingHelper.onEnable(polling, {
      store: context.store,
      auth: context.auth,
      propsValue: context.propsValue
    });
  },
  
  // Clean up when the trigger is disabled
  async onDisable(context) {
    await pollingHelper.onDisable(polling, {
      store: context.store,
      auth: context.auth,
      propsValue: context.propsValue
    });
  },
  
  // Regular polling execution to find new leads
  async run(context) {
    return await pollingHelper.poll(polling, {
      store: context.store,
      auth: context.auth,
      propsValue: context.propsValue,
      files: context.files
    });
  }
});