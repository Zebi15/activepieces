import { createAction, Property } from '@activepieces/pieces-framework';
import { twoSolarAuth } from '../../index';
import { TwoSolarCommon } from '../common';

export const updateLead = createAction({
  name: 'update_lead',
  displayName: 'Update Lead',
  description: 'Updates information for an existing lead in the 2Solar system',
  auth: twoSolarAuth,
  props: {
    leadId: Property.Number({
      displayName: 'Lead ID',
      description: 'The ID of the lead to update',
      required: true,
    }),
    callDateTime: Property.DateTime({
      displayName: 'Call Date and Time',
      description: 'The date and time of the call',
      required: false,
    }),
    callDuration: Property.Number({
      displayName: 'Call Duration (minutes)',
      description: 'The duration of the call in minutes',
      required: false,
    }),
    conversationSummary: Property.LongText({
      displayName: 'Conversation Summary',
      description: 'A summary of the conversation with the lead',
      required: false,
    }),
    keyOutcomes: Property.LongText({
      displayName: 'Key Outcomes and Notes',
      description: 'Key outcomes and notes from the interaction',
      required: false,
    }),
  },
  
  async run(context) {
    // Access auth from context.auth instead of context.propsValue
    const { leadId, callDateTime, callDuration, conversationSummary, keyOutcomes } = context.propsValue;
    const auth = context.auth;
    
    // Create the payload with only the provided fields
    const updateData: Record<string, any> = {};
    
    if (callDateTime) {
      updateData['call_date_time'] = callDateTime;
    }
    
    if (callDuration !== undefined) {
      updateData['call_duration'] = callDuration;
    }
    
    if (conversationSummary) {
      updateData['conversation_summary'] = conversationSummary;
    }
    
    if (keyOutcomes) {
      updateData['key_outcomes'] = keyOutcomes;
    }
    
    // Ensure we have data to update
    if (Object.keys(updateData).length === 0) {
      throw new Error('No data provided for the update');
    }
    
    // Prepare the API endpoint
    const endpoint = `${TwoSolarCommon.baseUrl}${TwoSolarCommon.endpoints.updatePerson}`.replace('{id}', leadId.toString());
    
    // Call the 2Solar API to update the lead
    const response = await fetch(endpoint, {
      method: 'PATCH',  // Using PATCH to update only the provided fields
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth}`
      },
      body: JSON.stringify(updateData)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update lead in 2Solar: ${response.statusText}`);
    }
    
    // Return the updated lead data
    return await response.json();
  },
});