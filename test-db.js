const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const collabs = await prisma.collaborator.findMany();
  console.log(collabs.map(c => ({ name: c.brandingName, logoUrl: c.logoUrl })));
}
main().catch(console.error).finally(() => prisma.$disconnect());
