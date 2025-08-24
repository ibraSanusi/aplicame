-- CreateTable
CREATE TABLE "Application" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "company" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "email" TEXT,
    "url" TEXT,
    "message" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'ENVIADO'
);
