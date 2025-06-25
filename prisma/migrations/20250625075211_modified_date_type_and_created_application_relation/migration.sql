/*
  Warnings:

  - You are about to drop the column `date` on the `Application` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Application" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "company" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "email" TEXT,
    "url" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" TEXT NOT NULL DEFAULT 'ENVIADO',
    "userId" TEXT,
    CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Application" ("company", "email", "id", "message", "platform", "state", "url") SELECT "company", "email", "id", "message", "platform", "state", "url" FROM "Application";
DROP TABLE "Application";
ALTER TABLE "new_Application" RENAME TO "Application";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
