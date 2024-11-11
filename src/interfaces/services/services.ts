interface GeneralType {
  userId: string;
  movie_title: string;
}

interface InitializeReadMyScriptPayload extends GeneralType {
  title: "Read My Script";
  synopsis: string;
  genre: string;
  platforms: string;
  files: File | null;
  concerns?: string;
  type: "request";
}
interface IServiceResponse {
  result: {
    // transaction: {
    //   _id: string;
    //   title: string;
    // //   userId: "672216eee975b6511c6f9876";
    // //   type: "request";
    // //   orderId: "62d056efb80";
    // //   __v: 0;
    //   reference: "ygssyvz15s";
    // };
    authorization_url: string;
    access_code: string;
  };
}

interface InitialWatchFinalCutPayload extends GeneralType {
  title: "Watch My Final Cut";
  type: "request";
  synopsis: string;
  link: string;
  concerns: string;
  genre: string;
  platform: string;
}

interface InitializeBudgetAndAdvicePayload extends GeneralType {
  title: "Look At My Budget";
  type: "request";
  synopsis: string;
  genre: string;
  platform: string;
  concerns: string;
  files: File | null;
}

interface InitializeCreateProductionBudgetPayload extends GeneralType {
  title: "Create Production Budget";
  platform: string;
  crews: string;
  days: string;
  budgetrange: string;
  files: File | null;
  actors: string;
  info: string;
  type: "request";
}

interface InitializeCreateMartketingBudgetPayload extends GeneralType {
  title: "Create Marketing Budget";
  type: "request";
  movie_title: string;
  platform: string;
  link: string;
  social: string;
  ooh: string;
  budgetrange: string;
}

interface InitializeCreatePitchPayload extends GeneralType {
  title: "Create A Pitch";
  type: "request";
  platform: string;
  files: File | null;
  crew: string;
  actors: string;
  visualStyle: string;
  info: string;
  budgetrange: string;
}

interface InitializaeDraftLegalDocument extends GeneralType {
  type: "Movie Pitch";
  title: "Legal"
  productionCompany: string
  contacts: string
}
