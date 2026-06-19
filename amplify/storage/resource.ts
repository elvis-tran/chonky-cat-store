// amplify/storage/resource.ts
import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'catFoodProductImages',
  access: (allow) => ({
    // 'public/*' folder allows everyone to read (guests)
    'public/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
    // 'private/{entity_id}/*' folder allows only the specific owner to access
    'private/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete'])
    ]
  }),
});