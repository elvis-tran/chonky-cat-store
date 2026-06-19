// amplify/backend.ts
import { defineBackend } from '@aws-amplify/backend';
import { storage } from './storage/resource';

defineBackend({
  storage,
});