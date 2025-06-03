import { PrismaClient, Prisma } from '../app/generated/prisma';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
	{
		email: 'alice@prisma.io',
		password: '2342342123sdfsdfF#',
	},
];

export async function main() {
	for (const u of userData) {
		await prisma.user.create({ data: u });
	}
}

main();
