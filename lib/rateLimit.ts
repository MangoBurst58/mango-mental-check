import { prisma } from "./prisma";

const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_BLOCK_TIME = 15 * 60 * 1000;

export const rateLimit = {
  login: {
    check: async (email: string) => {
      const attempt = await prisma.loginAttempt.findUnique({
        where: { email },
      });

      if (!attempt) {
        return { allowed: true, remaining: LOGIN_MAX_ATTEMPTS };
      }

      if (attempt.blockedUntil && attempt.blockedUntil > new Date()) {
        const blockMinutes = Math.ceil((attempt.blockedUntil.getTime() - Date.now()) / 60000);
        return { allowed: false, remaining: 0, blockMinutes };
      }

      if (attempt.blockedUntil && attempt.blockedUntil <= new Date()) {
        await prisma.loginAttempt.delete({ where: { email } });
        return { allowed: true, remaining: LOGIN_MAX_ATTEMPTS };
      }

      const remaining = LOGIN_MAX_ATTEMPTS - attempt.attempt;
      return { allowed: remaining > 0, remaining: remaining > 0 ? remaining : 0 };
    },

    record: async (email: string, success: boolean = false) => {
      if (success) {
        await prisma.loginAttempt.delete({ where: { email } }).catch(() => {});
        return;
      }

      const existing = await prisma.loginAttempt.findUnique({
        where: { email },
      });

      if (!existing) {
        await prisma.loginAttempt.create({
          data: { email, attempt: 1, lastAttempt: new Date() },
        });
      } else {
        const newAttempt = existing.attempt + 1;
        const blockedUntil = newAttempt >= LOGIN_MAX_ATTEMPTS 
          ? new Date(Date.now() + LOGIN_BLOCK_TIME) 
          : null;

        await prisma.loginAttempt.update({
          where: { email },
          data: { attempt: newAttempt, lastAttempt: new Date(), blockedUntil },
        });
      }
    },

    reset: async (email: string) => {
      await prisma.loginAttempt.delete({ where: { email } }).catch(() => {});
    },
  },

  forgot: {
    check: async (email: string) => {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const count = await prisma.passwordResetToken.count({
        where: { email, createdAt: { gte: oneHourAgo } },
      });
      const remaining = 3 - count;
      if (remaining <= 0) return { allowed: false, remaining: 0, blockMinutes: 60 };
      return { allowed: true, remaining };
    },
    record: async () => {  // Tidak menerima parameter
      // Token sudah tercatat, tidak perlu record tambahan
    },
    reset: async (email: string) => {
      await prisma.passwordResetToken.deleteMany({ where: { email } }).catch(() => {});
    },
  },
};