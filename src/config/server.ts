export const development = "http://localhost:5000";
export const production = "https://api.directwholesalecars.com.au";

// Assign a value to `curr_env`, not a type
const curr_env: "Prod" | "DEV" = "DEV";

//   //@ts-ignore
curr_env === "DEV" ? development : production;
export const BACKEND_URL = "https://api.directwholesalecars.com.au";
// export const BACKEND_URL = "http://localhost:5000";