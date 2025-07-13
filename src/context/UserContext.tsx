import React, { createContext, useState, useEffect, ReactNode } from "react";

interface User {
	name: string;
	surname: string;
	phone: string;
}

interface UserContextProps {
	user: User | null;
	setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const handleSetUser = (user: User) => {
		setUser(user);
		localStorage.setItem("user", JSON.stringify(user));
	};

	return (
		<UserContext.Provider value={{ user, setUser: handleSetUser }}>
			{children}
		</UserContext.Provider>
	);
};
