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
      description: 'The ID of the lead to update (request_id)',
      required: true,
    }),
    
    // Request and Status Information
    leadGroupId: Property.ShortText({
      displayName: 'Lead Group ID',
      description: 'Group ID for the lead',
      required: false,
    }),
    requestClientStatusId: Property.ShortText({
      displayName: 'Request Client Status ID',
      description: 'Status ID for the client request',
      required: false,
    }),
    originalClientStatusId: Property.ShortText({
      displayName: 'Original Client Status ID',
      description: 'Original status ID for the client',
      required: false,
    }),
    originalStatus: Property.ShortText({
      displayName: 'Original Status',
      description: 'Original status of the lead',
      required: false,
    }),
    personId: Property.ShortText({
      displayName: 'Person ID',
      description: 'Unique identifier for the person',
      required: false,
    }),
    parentPersonId: Property.ShortText({
      displayName: 'Parent Person ID',
      description: 'ID of the parent person (if applicable)',
      required: false,
    }),
    requestDate: Property.DateTime({
      displayName: 'Request Date',
      description: 'Date when the request was created',
      required: false,
    }),
    requestTypeId: Property.ShortText({
      displayName: 'Request Type ID',
      description: 'ID of the request type',
      required: false,
    }),
    requestTypeName: Property.ShortText({
      displayName: 'Request Type Name',
      description: 'Name of the request type (e.g., "Zonnepanelen")',
      required: false,
    }),
    requestStatus: Property.ShortText({
      displayName: 'Request Status',
      description: 'Current status of the request',
      required: false,
    }),
    currentUserId: Property.ShortText({
      displayName: 'Current User ID',
      description: 'ID of the current assigned user',
      required: false,
    }),
    currentUserName: Property.ShortText({
      displayName: 'Current User Name',
      description: 'Name of the current assigned user',
      required: false,
    }),
    
    // Reference Information
    referenceNumber: Property.ShortText({
      displayName: 'Reference Number',
      description: 'Primary reference number',
      required: false,
    }),
    referenceNumber2: Property.ShortText({
      displayName: 'Reference Number 2',
      description: 'Secondary reference number',
      required: false,
    }),
    referenceNumber3: Property.ShortText({
      displayName: 'Reference Number 3',
      description: 'Tertiary reference number',
      required: false,
    }),
    
    // Banking and Company Information
    bankAccountNumber: Property.ShortText({
      displayName: 'Bank Account Number',
      description: 'Bank account number of the lead',
      required: false,
    }),
    ascription: Property.ShortText({
      displayName: 'Ascription',
      description: 'Ascription details',
      required: false,
    }),
    companyName: Property.ShortText({
      displayName: 'Company Name',
      description: 'Name of the company (if applicable)',
      required: false,
    }),
    
    // Personal Information
    gender: Property.ShortText({
      displayName: 'Gender',
      description: 'Gender of the lead (e.g., "m", "f", "u")',
      required: false,
    }),
    initials: Property.ShortText({
      displayName: 'Initials',
      description: 'Initials of the lead',
      required: false,
    }),
    firstName: Property.ShortText({
      displayName: 'First Name',
      description: 'First name of the lead',
      required: false,
    }),
    infix: Property.ShortText({
      displayName: 'Infix',
      description: 'Name infix (e.g., "de", "van", etc.)',
      required: false,
    }),
    lastName: Property.ShortText({
      displayName: 'Last Name',
      description: 'Last name of the lead',
      required: false,
    }),
    
    // Address Information
    address: Property.ShortText({
      displayName: 'Address',
      description: 'Street name',
      required: false,
    }),
    number: Property.ShortText({
      displayName: 'House Number',
      description: 'House or building number',
      required: false,
    }),
    numberAddition: Property.ShortText({
      displayName: 'House Number Addition',
      description: 'Additional house number information (e.g., "A", "III")',
      required: false,
    }),
    postcode: Property.ShortText({
      displayName: 'Postal Code',
      description: 'Postal code/ZIP code',
      required: false,
    }),
    city: Property.ShortText({
      displayName: 'City',
      description: 'City name',
      required: false,
    }),
    province: Property.ShortText({
      displayName: 'Province/State',
      description: 'Province or state name',
      required: false,
    }),
    country: Property.ShortText({
      displayName: 'Country',
      description: 'Country name',
      required: false,
    }),
    buildingProject: Property.ShortText({
      displayName: 'Building Project',
      description: 'Building project status',
      required: false,
    }),
    projectLocation: Property.ShortText({
      displayName: 'Project Location',
      description: 'Location of the project',
      required: false,
    }),
    projectLocationStatus: Property.ShortText({
      displayName: 'Project Location Status',
      description: 'Status of the project location',
      required: false,
    }),
    
    // Geographic Information
    longitude: Property.ShortText({
      displayName: 'Longitude',
      description: 'Longitude coordinate',
      required: false,
    }),
    latitude: Property.ShortText({
      displayName: 'Latitude',
      description: 'Latitude coordinate',
      required: false,
    }),
    
    // Contact Information
    telephone: Property.ShortText({
      displayName: 'Telephone',
      description: 'Landline telephone number',
      required: false,
    }),
    mobile: Property.ShortText({
      displayName: 'Mobile',
      description: 'Mobile phone number',
      required: false,
    }),
    email: Property.ShortText({
      displayName: 'Email',
      description: 'Email address',
      required: false,
    }),
    
    // Additional Information
    comments: Property.LongText({
      displayName: 'Comments',
      description: 'General comments',
      required: false,
    }),
    jaarlijksVerbruik: Property.ShortText({
      displayName: 'Annual Energy Usage',
      description: 'Annual energy consumption (jaarlijks verbruik)',
      required: false,
    }),
    clientId: Property.ShortText({
      displayName: 'Client ID',
      description: 'ID of the client',
      required: false,
    }),
    
    // Installation Information
    inspectionDate: Property.DateTime({
      displayName: 'Inspection Date',
      description: 'Date of inspection',
      required: false,
    }),
    indicationInstallationDate: Property.DateTime({
      displayName: 'Indication Installation Date',
      description: 'Indicated date for installation',
      required: false,
    }),
    installationDuration: Property.ShortText({
      displayName: 'Installation Duration',
      description: 'Duration of the installation',
      required: false,
    }),
    installationDate: Property.DateTime({
      displayName: 'Installation Date',
      description: 'Actual date of installation',
      required: false,
    }),
    
    // Extra Fields (Common Ones)
    oorsprongLead: Property.ShortText({
      displayName: 'Lead Origin',
      description: 'Origin of the lead (oorsprong lead)',
      required: false,
    }),
    monumentaalPand: Property.ShortText({
      displayName: 'Monumental Building',
      description: 'Whether the building is a monument (monumentaal pand)',
      required: false,
    }),
    asbestDak: Property.ShortText({
      displayName: 'Asbestos Roof',
      description: 'Whether there is asbestos under the roof (zit er asbest onder het dak)',
      required: false,
    }),
    typeDak: Property.ShortText({
      displayName: 'Roof Type',
      description: 'Type of roof (type dak)',
      required: false,
    }),
    dakbedekking: Property.ShortText({
      displayName: 'Roof Covering',
      description: 'Type of roof covering (wat voor een soort dakbedekking heeft jouw dak)',
      required: false,
    }),
    leeftijdSchuineDak: Property.ShortText({
      displayName: 'Age of Sloped Roof',
      description: 'Age of the sloped roof (wat is de leeftijd van jouw schuine dak)',
      required: false,
    }),
    leeftijdPlatteDak: Property.ShortText({
      displayName: 'Age of Flat Roof',
      description: 'Age of the flat roof (wat is de leeftijd van jouw platte dak)',
      required: false,
    }),
    opmerkingenIntake: Property.LongText({
      displayName: 'Intake Comments',
      description: 'Comments from the intake (opmerkingen uit intake)',
      required: false,
    }),
    yearlyKwhUsage: Property.ShortText({
      displayName: 'Yearly kWh Usage',
      description: 'Yearly electricity usage in kWh',
      required: false,
    }),
    restpunt: Property.ShortText({
      displayName: 'Rest Point',
      description: 'Rest point information (restpunt)',
      required: false,
    }),
    materialenBesteld: Property.ShortText({
      displayName: 'Materials Ordered',
      description: 'Whether all materials have been ordered (alle materialen besteld)',
      required: false,
    }),
    materialenVoorraad: Property.ShortText({
      displayName: 'Materials in Stock',
      description: 'Whether all materials are in stock (alle materialen op voorraad)',
      required: false,
    }),
    energyExpiryDate: Property.DateTime({
      displayName: 'Energy Expiry Date',
      description: 'Expiration date of energy contract',
      required: false,
    }),
    serviceOorzaak: Property.ShortText({
      displayName: 'Service Cause',
      description: 'Cause of service (service oorzaak)',
      required: false,
    }),
    
    // Call Information (from original requirements)
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
    const props = context.propsValue;
    const auth = context.auth;
    
    // Create the payload with only the provided fields
    const updateData: Record<string, any> = {};
    
    // Request and Status Information
    if (props.leadGroupId !== undefined) updateData['lead_group_id'] = props.leadGroupId;
    if (props.requestClientStatusId !== undefined) updateData['request_client_status_id'] = props.requestClientStatusId;
    if (props.originalClientStatusId !== undefined) updateData['original_client_status_id'] = props.originalClientStatusId;
    if (props.originalStatus !== undefined) updateData['original_status'] = props.originalStatus;
    if (props.personId !== undefined) updateData['person_id'] = props.personId;
    if (props.parentPersonId !== undefined) updateData['parent_person_id'] = props.parentPersonId;
    if (props.requestDate !== undefined) updateData['request_date'] = props.requestDate;
    if (props.requestTypeId !== undefined) updateData['request_type_id'] = props.requestTypeId;
    if (props.requestTypeName !== undefined) updateData['request_type_name'] = props.requestTypeName;
    if (props.requestStatus !== undefined) updateData['request_status'] = props.requestStatus;
    if (props.currentUserId !== undefined) updateData['current_user_id'] = props.currentUserId;
    if (props.currentUserName !== undefined) updateData['current_user_name'] = props.currentUserName;
    
    // Reference Information
    if (props.referenceNumber !== undefined) updateData['reference_number'] = props.referenceNumber;
    if (props.referenceNumber2 !== undefined) updateData['reference_number_2'] = props.referenceNumber2;
    if (props.referenceNumber3 !== undefined) updateData['reference_number_3'] = props.referenceNumber3;
    
    // Banking and Company Information
    if (props.bankAccountNumber !== undefined) updateData['bank_account_number'] = props.bankAccountNumber;
    if (props.ascription !== undefined) updateData['ascription'] = props.ascription;
    if (props.companyName !== undefined) updateData['company_name'] = props.companyName;
    
    // Personal Information
    if (props.gender !== undefined) updateData['gender'] = props.gender;
    if (props.initials !== undefined) updateData['initials'] = props.initials;
    if (props.firstName !== undefined) updateData['first_name'] = props.firstName;
    if (props.infix !== undefined) updateData['infix'] = props.infix;
    if (props.lastName !== undefined) updateData['last_name'] = props.lastName;
    
    // Address Information
    if (props.address !== undefined) updateData['address'] = props.address;
    if (props.number !== undefined) updateData['number'] = props.number;
    if (props.numberAddition !== undefined) updateData['number_addition'] = props.numberAddition;
    if (props.postcode !== undefined) updateData['postcode'] = props.postcode;
    if (props.city !== undefined) updateData['city'] = props.city;
    if (props.province !== undefined) updateData['province'] = props.province;
    if (props.country !== undefined) updateData['country'] = props.country;
    if (props.buildingProject !== undefined) updateData['building_project'] = props.buildingProject;
    if (props.projectLocation !== undefined) updateData['project_location'] = props.projectLocation;
    if (props.projectLocationStatus !== undefined) updateData['project_location_status'] = props.projectLocationStatus;
    
    // Geographic Information
    if (props.longitude !== undefined) updateData['longitude'] = props.longitude;
    if (props.latitude !== undefined) updateData['latitude'] = props.latitude;
    
    // Contact Information
    if (props.telephone !== undefined) updateData['telephone'] = props.telephone;
    if (props.mobile !== undefined) updateData['mobile'] = props.mobile;
    if (props.email !== undefined) updateData['email'] = props.email;
    
    // Additional Information
    if (props.comments !== undefined) updateData['comments'] = props.comments;
    if (props.jaarlijksVerbruik !== undefined) updateData['jaarlijks_verbruik'] = props.jaarlijksVerbruik;
    if (props.clientId !== undefined) updateData['client_id'] = props.clientId;
    
    // Installation Information
    if (props.inspectionDate !== undefined) updateData['inspection_date'] = props.inspectionDate;
    if (props.indicationInstallationDate !== undefined) updateData['indication_installation_date'] = props.indicationInstallationDate;
    if (props.installationDuration !== undefined) updateData['installation_duration'] = props.installationDuration;
    if (props.installationDate !== undefined) updateData['installation_date'] = props.installationDate;
    
    // Extra Fields
    const extraFields: Record<string, any> = {};
    let hasExtraFields = false;
    
    if (props.oorsprongLead !== undefined) { extraFields['oorsprong_lead'] = props.oorsprongLead; hasExtraFields = true; }
    if (props.monumentaalPand !== undefined) { extraFields['monumentaal_pand'] = props.monumentaalPand; hasExtraFields = true; }
    if (props.asbestDak !== undefined) { extraFields['zit_er_asbest_onder_het_dak'] = props.asbestDak; hasExtraFields = true; }
    if (props.typeDak !== undefined) { extraFields['type_dak'] = props.typeDak; hasExtraFields = true; }
    if (props.dakbedekking !== undefined) { extraFields['wat_voor_een_soort_dakbedekking_heeft_jouw_dak'] = props.dakbedekking; hasExtraFields = true; }
    if (props.leeftijdSchuineDak !== undefined) { extraFields['wat_is_de_leeftijd_van_jouw_schuine_dak'] = props.leeftijdSchuineDak; hasExtraFields = true; }
    if (props.leeftijdPlatteDak !== undefined) { extraFields['wat_is_de_leeftijd_van_jouw_platte_dak'] = props.leeftijdPlatteDak; hasExtraFields = true; }
    if (props.opmerkingenIntake !== undefined) { extraFields['opmerkingen_uit_intake'] = props.opmerkingenIntake; hasExtraFields = true; }
    if (props.yearlyKwhUsage !== undefined) { extraFields['yearly_kwh_usage'] = props.yearlyKwhUsage; hasExtraFields = true; }
    if (props.restpunt !== undefined) { extraFields['restpunt'] = props.restpunt; hasExtraFields = true; }
    if (props.materialenBesteld !== undefined) { extraFields['alle_materialen_besteld'] = props.materialenBesteld; hasExtraFields = true; }
    if (props.materialenVoorraad !== undefined) { extraFields['alle_materialen_op_voorraad_'] = props.materialenVoorraad; hasExtraFields = true; }
    if (props.energyExpiryDate !== undefined) { extraFields['energy_expiry_date'] = props.energyExpiryDate; hasExtraFields = true; }
    if (props.serviceOorzaak !== undefined) { extraFields['service_oorzaak'] = props.serviceOorzaak; hasExtraFields = true; }
    
    // Add extra_fields to the update data if any were specified
    if (hasExtraFields) {
      updateData['extra_fields'] = extraFields;
    }
    
    // Call Information
    if (props.callDateTime !== undefined) updateData['call_date_time'] = props.callDateTime;
    if (props.callDuration !== undefined) updateData['call_duration'] = props.callDuration;
    if (props.conversationSummary !== undefined) updateData['conversation_summary'] = props.conversationSummary;
    if (props.keyOutcomes !== undefined) updateData['key_outcomes'] = props.keyOutcomes;
    
    // Ensure we have data to update
    if (Object.keys(updateData).length === 0) {
      throw new Error('No data provided for the update');
    }
    
    // Prepare the API endpoint
    const endpoint = `${TwoSolarCommon.baseUrl}${TwoSolarCommon.endpoints.updatePerson}`.replace('{request_id}', props.leadId.toString());
    
    // Call the 2Solar API to update the lead
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth}`
      },
      body: JSON.stringify(updateData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update lead in 2Solar: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    // Return the updated lead data
    return await response.json();
  },
});