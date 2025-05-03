
    import { createPiece, PieceAuth } from "@activepieces/pieces-framework";

    export const twoSolarAuth = PieceAuth.SecretText({
      displayName: '2Solar API Key',
      required: true,
      description: 'API Key for 2Solar authentication',
    });

    export const twoSolar = createPiece({
      displayName: "2solar",
      auth: PieceAuth.None(),
      minimumSupportedRelease: '0.36.1',
      logoUrl: "https://cdn.activepieces.com/pieces/2solar.png",
      authors: ['Zebi'],
      actions: [],
      triggers: [],
    });
    