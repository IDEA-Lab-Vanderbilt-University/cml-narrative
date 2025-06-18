/**
 /src/routes/introduction/onboarding/tablet-tutorial/+page.ts
 +page.ts
 cml-narrative
 
 Created by Ian Thompson on January 10th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/
import script from '$lib/scripts/introduction/onboarding/tablet-tutorial';
import { createPageLoad } from '$lib/utils/createPageLoad';

export const load = createPageLoad(script);