import { client } from './trpc';

console.log(client.health.get.query());
