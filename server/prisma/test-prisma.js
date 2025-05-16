const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient();

/**
 * File to test the Prisma connection to the DB and check errors
 */
async function testConnection() {
    try {
        await prisma.$connect();
        console.log("Successfully connected to the DB");
        const users = await prisma.user.findMany();
        console.log('Users in the DB:' ,users);
        
        
    } catch (error) {
        console.error('Error connecting to the DB', error);
    } finally {
        await prisma.$disconnect();
    }
    
}

testConnection();