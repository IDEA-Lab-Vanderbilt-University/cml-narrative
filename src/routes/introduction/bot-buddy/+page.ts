/**
 /src/routes/introduction/onboarding/bot-buddy/+page.ts
 +page.ts
 cml-narrative
 
 Created by Ian Thompson on January 14th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/
import script from '$lib/scripts/introduction/bot-buddy';
import { createPageLoad } from '../../../lib/utils/createPageLoad';

export const load = createPageLoad(script);