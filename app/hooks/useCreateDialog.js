import * as React from "react";

const useCreateDialog = (opened = false) => {
	const [openedCreateDialog, setOpenedCreateDialog] = React.useState(opened);

	const handleOpenCreateDialog = () => {
		setOpenedCreateDialog(true);
	};

	const handleCloseCreateDialog = () => {
		setOpenedCreateDialog(false);
	};

	return {
		openedCreateDialog,
		handleCloseCreateDialog,
		handleOpenCreateDialog,
	};
};

export default useCreateDialog;
