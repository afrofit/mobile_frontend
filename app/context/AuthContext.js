import * as React from "react";

export const AuthContext = React.createContext();

class AuthContextProvider extends React.Component {
	state = {
		currentUser: null,
	};

	getState = () => {
		return this.state;
	};

	unsetUser = () => {
		this.setState({ currentUser: null });
	};

	setCurrentUserAsync = (user) => {
		setTimeout(() => {
			this.setState({ currentUser: user });
		}, 200);
	};

	setCurrentUser = (user) => {
		this.setState({ currentUser: user });
	};

	render() {
		return (
			<AuthContext.Provider
				value={{
					...this.state,
					setCurrentUser: this.setCurrentUser,
					setCurrentUserAsync: this.setCurrentUserAsync,
					unsetUser: this.unsetUser,
					getState: this.getState,
				}}
			>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}

export default AuthContextProvider;
