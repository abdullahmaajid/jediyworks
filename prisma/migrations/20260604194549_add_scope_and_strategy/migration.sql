-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "scope_of_work" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "strategy" TEXT;
