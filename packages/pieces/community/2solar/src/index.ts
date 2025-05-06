
    import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
    import { newLead } from './lib/triggers/new-lead';
    import { updateLead } from './lib/actions/update-lead';

    export const twoSolarAuth = PieceAuth.SecretText({
      displayName: '2Solar API Key',
      required: true,
      description: 'API Key for 2Solar authentication',
    });

    export const twoSolar = createPiece({
      displayName: "2solar",
      logoUrl: 'https://media.licdn.com/dms/image/v2/D4E0BAQEZfEfwM7ddIg/company-logo_200_200/company-logo_200_200/0/1705589996914/2solar_software_logo?e=2147483647&v=beta&t=BEu4OZveMMc8FMNp9rDPZ4-TPqxyNoDQe6sydNQO9y4',
      authors: ['Zebi'],
      minimumSupportedRelease: '0.5.0',
      auth: twoSolarAuth,
      triggers: [newLead],
      actions: [updateLead],
    });
    