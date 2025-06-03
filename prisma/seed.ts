import { PrismaClient, Prisma } from '../app/generated/prisma';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
	{
		email: 'alice@prisma.io',
		password: '2342342123sdfsdfF#',
	},
];

const componentConfigData: Prisma.ComponentConfigCreateInput[] = [
	{ component: 'aboutMe', pageNumber: 2 },
	{ component: 'address', pageNumber: 3 },
	{ component: 'birthdate', pageNumber: 3 },
];

export async function main() {
	for (const user of userData) {
		await prisma.user.create({ data: user });
	}
	for (const component of componentConfigData) {
		await prisma.componentConfig.create({ data: component });
	}
}

main();
