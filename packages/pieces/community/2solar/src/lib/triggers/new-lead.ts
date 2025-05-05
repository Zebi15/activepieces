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
 * Interface for 2Solar API lead/person response
 */
interface TwoSolarLead {
  request_id: string;
  person_id: string;
  request_date: string;
  first_name?: string;
  infix?: string;
  last_name?: string;
  mobile?: string;
  telephone?: string;
  email?: string;
  address?: string;
  number?: string;
  postcode?: string;
  city?: string;
  request_type_name?: string;
  [key: string]: any;
}

/**
 * Polling configuration for fetching new leads from 2Solar API
 */
const polling: Polling<string, { lookbackPeriod?: number }> = {
  strategy: DedupeStrategy.TIMEBASED,
  items: async ({ auth, propsValue, lastFetchEpochMS }) => {
    console.log('2Solar: Fetching new leads');
    
    // Calculate date range for fetching leads
    // Default to looking back 30 days on first run to catch any existing leads
    const defaultLookback = propsValue.lookbackPeriod || 720; // 30 days in hours
    const fetchFrom = lastFetchEpochMS 
      ? dayjs(lastFetchEpochMS) 
      : dayjs().subtract(defaultLookback, 'hour');
    
    const dateParam = fetchFrom.format('YYYY-MM-DD HH:mm:ss');
    const apiUrl = `${TwoSolarCommon.baseUrl}${TwoSolarCommon.endpoints.searchPersons}/?date_created_from=${encodeURIComponent(dateParam)}`;
    
    console.log(`2Solar: Searching for leads created after ${dateParam}`);
    
    // Fetch data from 2Solar API
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${auth}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch leads: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Handle API error response
    if (data.error) {
      console.log('2Solar API returned error:', data.error);
      return [];
    }
    
    // Extract leads from response
    const leads: TwoSolarLead[] = [];
    for (const key in data) {
      if (key !== 'error' && key !== '0' && data[key] && typeof data[key] === 'object') {
        leads.push(data[key]);
      }
    }
    
    console.log(`2Solar: Found ${leads.length} leads`);
    
    // Transform leads to required format
    return leads.map((lead) => {
      const fullName = [lead.first_name, lead.infix, lead.last_name]
        .filter(Boolean)
        .join(' ');
      
      const fullAddress = [
        lead.address && lead.number ? `${lead.address} ${lead.number}` : lead.address,
        lead.postcode,
        lead.city
      ].filter(Boolean).join(', ');
      
      return {
        epochMilliSeconds: dayjs(lead.request_date).valueOf(),
        data: {
          id: lead.request_id,
          name: fullName,
          phone_number: lead.mobile || lead.telephone || '',
          email: lead.email || '',
          address: fullAddress,
          lead_type: lead.request_type_name || '',
          product_type: lead.request_type_name || '',
          created_date: lead.request_date
        }
      };
    });
  }
};

/**
 * New Lead Trigger
 * Polls the 2Solar API every 5 minutes to fetch new leads/persons.
 * Implements deduplication based on creation time to prevent duplicate processing.
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
      defaultValue: 720, 
      required: false,
    }),
  },
  type: TriggerStrategy.POLLING,
  
  sampleData: {
    id: "5955400",
    name: "T. de Mol",
    phone_number: "+31610687100",
    email: "tim@nexva.io",
    address: "Langegracht 70, 2312NV, Leiden",
    lead_type: "Zonnepanelen",
    product_type: "Zonnepanelen",
    created_date: "2025-04-02 11:23:21"
  },
  
  async test(context) {
    return await pollingHelper.test(polling, context);
  },
  
  async onEnable(context) {
    await pollingHelper.onEnable(polling, context);
  },
  
  async onDisable(context) {
    await pollingHelper.onDisable(polling, context);
  },
  
  async run(context) {
    return await pollingHelper.poll(polling, context);
  }
});