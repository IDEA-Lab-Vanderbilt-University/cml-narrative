/**
 /src/routes/introduction/welcome/+page.ts
 +page.ts
 cml-narrative
 
 Created by Ian Thompson on January 10th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/
import script from '$lib/scripts/introduction/welcome';
import { createPageLoad } from '$lib/utils/createPageLoad';

export const load = createPageLoad(script);
