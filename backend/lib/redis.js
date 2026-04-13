import Redis from "ioredis"
import dotenv from "dotenv"

dotenv.config()

export const redis = new Redis(process.env.UPSTASH_REDIS_URL);
await redis.set('foo', 'bar');

//redis = key-value store, we can set and get values using redis.set and redis.get