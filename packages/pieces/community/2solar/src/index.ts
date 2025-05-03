
    import { createPiece, PieceAuth } from "@activepieces/pieces-framework";

    export const 2solar = createPiece({
      displayName: "2solar",
      auth: PieceAuth.None(),
      minimumSupportedRelease: '0.36.1',
      logoUrl: "https://cdn.activepieces.com/pieces/2solar.png",
      authors: [],
      actions: [],
      triggers: [],
    });
    