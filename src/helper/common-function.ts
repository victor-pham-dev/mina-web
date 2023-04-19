export function compareTokenRedis(reqToken: string, redisToken: string): boolean {
	if (reqToken === redisToken) return true
	return false
}