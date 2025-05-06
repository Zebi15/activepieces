export const TwoSolarCommon = {
  baseUrl: 'https://app.2solar.nl/api',
  
  // API endpoints
  endpoints: {
    // Search endpoints
    searchPersons: '/person/search',
    
    // Person/request operations
    getPerson: '/person/{request_id}',
    createPerson: '/person',
    updatePerson: '/person/{request_id}',
    uploadImages: '/person/{request_id}/images',
    
    // V2 API endpoints
    getPersonV2: '/v2/persons/{person_id}'
  }
};