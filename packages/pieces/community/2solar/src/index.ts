
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
      logoUrl: 'https://app.2solar.nl/favicon.ico',
      authors: ['Zebi'],
      minimumSupportedRelease: '0.5.0',
      auth: twoSolarAuth,
      triggers: [newLead],
      actions: [updateLead],
    });
    
    module.exports = { twoSolar };