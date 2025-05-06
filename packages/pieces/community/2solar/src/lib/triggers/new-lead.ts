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
 * Interface for 2Solar API lead/person response fields
 * Includes all standard fields that can be returned from the API
 */
interface TwoSolarLead {
  lead_group_id?: string;
  request_client_status_id?: string;
  original_client_status_id?: string;
  original_status?: string;
  person_id: string;
  parent_person_id?: string | null;
  request_id: string;
  request_date: string;
  request_edited?: string;
  request_updated?: string;
  request_type_id?: string;
  request_type_name?: string;
  request_status?: string;
  current_user_id?: string;
  current_user_name?: string;
  reference_number?: string;
  reference_number_2?: string;
  reference_number_3?: string | null;
  bank_account_number?: string | null;
  ascription?: string | null;
  company_name?: string;
  gender?: string;
  initials?: string;
  first_name?: string;
  infix?: string;
  last_name?: string;
  address?: string;
  number?: string;
  postcode?: string;
  city?: string;
  province?: string;
  country?: string;
  building_project?: string;
  longitude?: string;
  latitude?: string;
  telephone?: string;
  mobile?: string;
  email?: string;
  comments?: string;
  jaarlijks_verbruik?: string;
  inspection_date?: string | null;
  indication_installation_date?: string | null;
  installation_duration?: string | null;
  installation_date?: string | null;
  client_id?: string;
  project_location_status?: string | null;
  extra_fields?: Record<string, any>;
  person_product_types?: any[];
  number_addition?: string;
  project_location?: string | null;
  searched_on?: number;
  [key: string]: any; // Allow any additional fields that might be returned
}

/**
 * Interface for formatted lead data that includes friendly formatted fields
 * alongside all original API fields
 */
interface FormattedLeadData extends TwoSolarLead {
  // Additional formatted fields for ease of use
  id: string;
  name: string;
  phone_number: string;
  address_formatted: string;
  lead_type: string;
  product_type: string;
  created_date: string;
}

/**
 * Polling configuration for fetching new leads from 2Solar API
 */
const polling: Polling<string, { lookbackPeriod?: number }> = {
  strategy: DedupeStrategy.TIMEBASED,
  items: async ({ auth, propsValue, lastFetchEpochMS, store }) => {
    // Calculate date range for fetching leads
    const defaultLookback = propsValue.lookbackPeriod || 720; // 30 days in hours
    const fetchFrom = lastFetchEpochMS 
      ? dayjs(lastFetchEpochMS) 
      : dayjs().subtract(defaultLookback, 'hour');
    
    const dateParam = fetchFrom.format('YYYY-MM-DD HH:mm:ss');
    const apiUrl = `${TwoSolarCommon.baseUrl}${TwoSolarCommon.endpoints.searchPersons}/?date_created_from=${encodeURIComponent(dateParam)}`;
    
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
      return [];
    }
    
    // Extract leads from response
    const leads: TwoSolarLead[] = [];
    for (const key in data) {
      if (key !== 'error' && key !== '0' && data[key] && typeof data[key] === 'object') {
        leads.push(data[key]);
      }
    }
    
    // Transform leads to required format
    return leads.map((lead) => {
      // Format the name
      const fullName = [lead.first_name, lead.infix, lead.last_name]
        .filter(Boolean)
        .join(' ');
      
      // Format the address
      const fullAddress = [
        lead.address && lead.number ? `${lead.address} ${lead.number}${lead.number_addition ? lead.number_addition : ''}` : lead.address,
        lead.postcode,
        lead.city
      ].filter(Boolean).join(', ');
      
      // Create the final data object with all fields
      const formattedData: FormattedLeadData = {
        ...lead, // Include all original fields
        id: lead.request_id,
        name: fullName,
        phone_number: lead.mobile || lead.telephone || '',
        address_formatted: fullAddress,
        lead_type: lead.request_type_name || '',
        product_type: lead.request_type_name || '',
        created_date: lead.request_date
      };
      
      return {
        epochMilliSeconds: dayjs(lead.request_date).valueOf(),
        data: formattedData
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
  
  // Complete sample data mirroring the actual API response
  sampleData: {
    // Formatted fields for easy access
    id: "5955400",
    name: "T. de Mol",
    phone_number: "+31610687100",
    address_formatted: "Langegracht 70, 2312NV, Leiden",
    lead_type: "Zonnepanelen",
    product_type: "Zonnepanelen",
    created_date: "2025-04-02 11:23:21",
    
    // Original API fields
    lead_group_id: "0",
    request_client_status_id: "280598",
    original_client_status_id: "280598",
    original_status: "particulier",
    person_id: "5678315",
    parent_person_id: null,
    request_id: "5955400",
    request_date: "2025-04-02 11:23:21",
    request_edited: "2025-04-02 11:52:57",
    request_updated: "2025-04-16 14:41:06",
    request_type_id: "8438",
    request_type_name: "Zonnepanelen",
    request_status: "particulier",
    current_user_id: "28946",
    current_user_name: "Tim de Mol",
    reference_number: "",
    reference_number_2: "",
    reference_number_3: null,
    bank_account_number: null,
    ascription: null,
    company_name: "",
    gender: "u",
    initials: "",
    first_name: "T.",
    infix: "de",
    last_name: "Mol",
    address: "Langegracht",
    number: "70",
    postcode: "2312NV",
    city: "Leiden",
    province: "Zuid-Holland",
    country: "Netherlands",
    building_project: "no",
    longitude: "4.49230001",
    latitude: "52.16365189",
    telephone: "",
    mobile: "+31610687100",
    email: "tim@nexva.io",
    comments: "",
    jaarlijks_verbruik: "",
    inspection_date: null,
    indication_installation_date: null,
    installation_duration: null,
    installation_date: null,
    client_id: "5126",
    project_location_status: null,
    extra_fields: {
      oorsprong_lead: "Handmatig",
      monumentaal_pand: null,
      zit_er_asbest_onder_het_dak: null,
      type_dak: null,
      wat_voor_een_soort_dakbedekking_heeft_jouw_dak: null,
      wat_is_de_leeftijd_van_jouw_schuine_dak: null,
      wat_is_de_leeftijd_van_jouw_platte_dak: null,
      opmerkingen_uit_intake: null,
      yearly_kwh_usage: null,
      bank_account_number: null,
      restpunt: null,
      alle_materialen_besteld: null,
      alle_materialen_op_voorraad_: null,
      energy_expiry_date: null,
      service_oorzaak: null
    },
    person_product_types: [],
    number_addition: "",
    project_location: null,
    searched_on: 0
  },
  
  // Test function for the Activepieces platform UI
  async test(context) {
    // Initialize store to prevent "lastPoll doesn't exist" error
    await context.store.put('lastPoll', { lastFetchEpochMS: 0 });
    return await pollingHelper.test(polling, context);
  },
  
  // Initialize trigger when enabled
  async onEnable(context) {
    await context.store.put('lastPoll', { lastFetchEpochMS: 0 });
    await pollingHelper.onEnable(polling, context);
  },
  
  // Clean up when disabled
  async onDisable(context) {
    await pollingHelper.onDisable(polling, context);
  },
  
  // Regular polling for new leads
  async run(context) {
    const lastPoll = await context.store.get('lastPoll');
    if (!lastPoll) {
      await context.store.put('lastPoll', { lastFetchEpochMS: 0 });
    }
    return await pollingHelper.poll(polling, context);
  }
});