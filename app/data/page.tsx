// import { prisma } from '../generated/prisma'
import prisma from '@/lib/prisma';

import React from 'react';

type UserTableRow = {
	id: string;
	email: string;
	aboutMe?: string | null;
	addressStreet?: string | null;
	addressCity?: string | null;
	addressState?: string | null;
	addressZip?: string | null;
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
								{[user.addressStreet, user.addressCity, user.addressState, user.addressZip]
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
