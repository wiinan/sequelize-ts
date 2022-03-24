import Redis from "ioredis";
import { promisify } from "util";

const redisClient = new Redis();

class HandleRedis {
  getRedis = (value: string) => {
    const syncRedisGet = promisify(redisClient.get).bind(redisClient);
    return syncRedisGet(value);
  };

  setRedis = (key: string, value: string) => {
    const syncRedisSet = promisify(redisClient.set).bind(redisClient);
    return syncRedisSet(key, value);
  };

  deleteRedis = (value: string) => {
    const syncRedisDel = promisify(redisClient.del).bind(redisClient);
    return syncRedisDel(value);
  };
}

export default new HandleRedis();
