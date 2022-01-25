import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import axios from "axios";

export default NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	callbacks: {
		session: async ({ session, token }) => {
			session.id = token.sub;
			const { data: {workspaces} } = await axios.get(
				"http://localhost:3001/user/workspace",
				{ params: { userId: session.id } }
			);
			console.log(workspaces);
			session.workspaces = workspaces?.map((workspace) => workspace.id);
			return Promise.resolve(session);
		},
		signIn: async ({ user }) => {
			//make request to backend
			axios
				.post(`http://localhost:3000/user`, {
					user_id: user.id,
					username: user.name,
				})
				.then((res) => console.log(res.data.message));
			return true;
		},
	},
	secret: "250ac2a8ae5131447da4b29349a520a944b85399b326b9651020b1368aa26960",
});
