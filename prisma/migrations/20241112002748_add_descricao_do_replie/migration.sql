/*
  Warnings:

  - Added the required column `descricao` to the `replies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "replies" ADD COLUMN     "descricao" TEXT NOT NULL;