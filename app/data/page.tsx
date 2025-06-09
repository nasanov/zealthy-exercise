// import { prisma } from s'../generated/prisma'
import prisma from '@/lib/prisma';
import React from 'react';

export const dynamic = 'force-dynamic';

type UserTableRow = {
	id: string;
	email: string;
	aboutMe?: string | null;
	street?: string | null;
	city?: string | null;
	state?: string | null;
	zip?: string | null;
	birthdate?: Date | string | null;
	createdAt: Date | string;
};

export default async function DataPage() {
	const users = await prisma.user.findMany({
		orderBy: { createdAt: 'desc' },
	});
	return (
		<div style={{ margin: '50px' }}>
			<h1>User Data</h1>
			<table className="data-table">
				<thead>
					<tr>
						<th>Email</th>
						<th>About Me</th>
						<th>Address</th>
						<th>Birthdate</th>
						<th>Created</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user: UserTableRow) => (
						<tr key={user.id}>
							<td>{user.email}</td>
							<td>{user.aboutMe || '-'}</td>
							<td>
								{[user.street, user.city, user.state, user.zip]
									.filter(Boolean) // filter out empty strings
									.join(', ')}
							</td>
							<td>{user.birthdate ? new Date(user.birthdate).toLocaleDateString() : ''}</td>
							<td>{new Date(user.createdAt).toLocaleString()}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
