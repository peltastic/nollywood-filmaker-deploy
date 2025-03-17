interface GeneralType {
  userId: string;
  movie_title: string;
  showtype: string;
  episodes?: string;
}

interface InitializeReadMyScriptPayload extends GeneralType {
  title: "Read my Script and advice";
  synopsis: string;
  genre: string;
  platforms: string;
  files?: File[];
  concerns?: string;
  type: "request";
  fileName: string;
  characterbible?: File;
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
  title: "Watch the Final cut of my film and advice";
  type: "request";
  synopsis: string;
  link: string[];
  concerns: string;
  genre: string;
  platform: string;
  stage: string;
}

interface InitializeBudgetAndAdvicePayload extends GeneralType {
  title: "Look at my Budget and advice";
  type: "request";
  synopsis: string;
  genre: string;
  platform: string;
  concerns: string;
  fileName: string;
  files: File | null;
}

interface InitializeCreateProductionBudgetPayload extends GeneralType {
  title: "Create a Production budget";
  platform: string;
  // crews: string;
  shootdays: string;
  budgetrange: string;
  files: File[];
  actors: string;
  info: string;
  type: "request";
  fileName: string;
}

interface InitializeCreateMartketingBudgetPayload {
  title: "Create a Marketing budget";
  type: "request";
  movie_title: string;
  platform: string;
  link: string;
  social: string;
  ooh: string;
  budgetrange: string;
  userId: string
}

interface InitializeMovieSchedule extends GeneralType {
  title: "Creating A Movie Schedule";
  type: "request";
  platform: string;
  files?: (File | null)[] | File[][];
  // crew: string;
  actors: string;
  // visualStyle: string;
  days?: string;
  startpop?: { date: string }[];
  info: string;
  budgetrange: string;
  fileName: string;
  // pageCount?: number[];
  characterlockdate: { name: string; date: string[] }[];
  locationlockeddate: { name: string; date: string[] }[];
}

interface InitializaeDraftLegalDocument extends GeneralType {
  type: "Movie Pitch";
  title: "Draft Legal documents";
  productionCompany: string;
  contacts: string;
}

interface InitializeCreateAPitchDeck {
  title: "Create A Pitch Deck";
  userId: string;
  type: "request";
  movie_title: string;
  platform: string;
  loglines: string;
  genre: string; 
  info: string;
  estimatedBudget: string;
  keycharacters: { character: string; actor: string }[];
  keycrew: { crew: string; role: string }[];
  teamMenber: { name: string; bio: string }[];
  putinfestivals: boolean;
  revprojection: string;
  files: File[];
  keyart: File[]
}
