import { useState } from "react";

export const useActions = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const openEditModal = () => {
    setOpenEdit(true);
  };

  const closeEditModal = () => {
    setOpenEdit(false);
  };

  const openDeleteModal = () => {
    setOpenDelete(true);
  };

  const closeDeleteModal = () => {
    setOpenDelete(false);
  };

  return {
    openEdit,
    openDelete,
    openEditModal,
    closeEditModal,
    closeDeleteModal,
    openDeleteModal,
  };
};
