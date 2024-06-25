import bcrypt from "bcryptjs";

export function hashPassword(password?: string) {
	if (!password) return;
	const passwordHashed = bcrypt.hashSync(password, 6);

	return passwordHashed;
}
